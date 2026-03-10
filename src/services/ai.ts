import { GoogleGenerativeAI } from '@google/generative-ai';
import type { BookingStep, BookingData } from '../types/booking';

// Try standard Vite and standard Node envs due to the Prompt 6 requirement
function getApiKey() {
  return import.meta.env.VITE_GEMINI_API_KEY || 
         import.meta.env.VITE_GOOGLE_API_KEY || 
         import.meta.env.GEMINI_API_KEY || 
         import.meta.env.GOOGLE_API_KEY || 
         import.meta.env.API_KEY || 
         '';
}

function getModel() {
  const key = getApiKey();
  const genAI = new GoogleGenerativeAI(key || "DUMMY_KEY_TO_PREVENT_CRASH");
  return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
}

const BUSINESS_KNOWLEDGE = `
NAMA BISNIS: PawParadise Petcare
POSITIONING: Perawatan profesional untuk hewan peliharaan kesayangan Anda.
BERDIRI SEJAK: 2015
STATUS: Menerima Reservasi Baru untuk 2026
PENGHARGAAN: Peringkat #1 Petshop & Grooming Terbaik 2026
ALAMAT: Jl. Anabul No. 123, Distrik Pusat Kota, Jakarta 90210
TELEPON: (021) 555-4567

JAM OPERASIONAL:
Senin-Jumat: 08:00 - 20:00
Sabtu-Minggu: 09:00 - 17:00

LAYANAN/PROGRAM:
1. Grooming Lengkap (Mandi, potong kuku, pembersihan telinga)
2. Pet Hotel (Penitipan hewan dengan AC & CCTV)
3. Vaksinasi Tahunan
4. Konsultasi Kesehatan Dasar
5. Antar-Jemput Hewan

DAFTAR HARGA:
- Grooming: Mulai dari Rp 100.000
- Pet Hotel: Rp 75.000 / malam
- Konsultasi Dokter: Rp 150.000
`;

const SYSTEM_INSTRUCTION = `
Anda adalah Asisten Pendukung Suara AI PawParadise Petcare.
Gunakan HANYA informasi bisnis yang disediakan dan konten yang terlihat di website ini.
Jangan menebak. Jangan mengarang informasi.
Jika sesuatu tidak tercantum: Katakan bahwa Anda tidak memiliki informasi tersebut dan arahkan pengunjung untuk melakukan reservasi atau menghubungi tim admin secara langsung (021) 555-4567.

NADA BICARA:
- Ramah & Sopan.
- Profesional.
- Jawaban SINGKAT dan PADAT (karena ini akan diucapkan via suara). Batasi maksimal 2-3 kalimat.
- Berfokus pada konversi (booking).

ATURAN FLOW BOOKING:
- Pengguna harus memberikan nama, jenis/nama hewan, layanan, tanggal, dan waktu (Pagi/Sore).
`;

function getPromptForStep(step: BookingStep, input: string, currentData: BookingData): string {
  const baseContext = `${BUSINESS_KNOWLEDGE}\n\n${SYSTEM_INSTRUCTION}\n\n`;
  
  switch(step) {
    case 'greeting':
    case 'info':
      return `${baseContext}Pengguna bertanya: "${input}". Jawab pertanyaannya secara singkat. Jika pengguna menunjukkan niat untuk booking (misal: "saya mau daftar", "booking grooming", "reservasi"), jawablah dengan mengajak memulai booking dan tanyakan: "Boleh saya tahu nama Anda dulu?" Jika bukan niat booking, jawab pertanyaannya secara reguler. HARAP BERIKAN RESPONSE DALAM FORMAT JSON BERIKUT: {"response": "jawaban ke user", "isStartingBooking": true/false}`;
      
    case 'collect_name':
      return `${baseContext}Pengguna sedang dalam proses booking. Konteks sebelumnya: kita menanyakan namanya. Input pengguna: "${input}". Ekstrak nama pengguna dan tanyakan jenis & nama hewan peliharaannya (contoh: Kucing/Anjing dan namanya). HARAP BERIKAN RESPONSE FORMAT JSON: {"response": "jawaban ke user", "extractedName": "nama yang diekstrak"}`;
      
    case 'collect_pet':
      return `${baseContext}Konteks: Booking untuk ${currentData.ownerName}. Kita menanyakan jenis dan nama hewan. Input pengguna: "${input}". Ekstrak jenis dan nama hewan, lalu tanyakan layanan apa yang diinginkan (Grooming/Hotel/Vaksin/dll). HARAP BERIKAN RESPONSE FORMAT JSON: {"response": "jawaban ke user", "extractedPet": "Kucing si belang / Anjing si boy dll"}`;
      
    case 'collect_service':
      return `${baseContext}Konteks: Booking atas nama ${currentData.ownerName} untuk hewannya ${currentData.petNameAndType}. Kita menanyakan layanan. Input: "${input}". Ekstrak layanan, lalu tanyakan rencana tanggal atau hari kunjungan. HARAP BERIKAN RESPONSE FORMAT JSON: {"response": "jawaban ke user", "extractedService": "layanan yang dipilih"}`;
      
    case 'collect_date':
      return `${baseContext}Konteks: Layanan ${currentData.service}. Kita menanyakan hari/tanggal kunjungan. Input: "${input}". Ekstrak tanggal/hari, lalu tanyakan persisnya sesi jam berapa, Pagi atau Sore? HARAP BERIKAN RESPONSE FORMAT JSON: {"response": "jawaban ke user", "extractedDate": "tanggal/hari yang dipilih"}`;

    case 'collect_time':
      return `${baseContext}Konteks: Kunjungan tanggal ${currentData.date}. Kita menanyakan sesi Pagi atau Sore. Input: "${input}". Ekstrak sesi waktunya, lalu berikan kesimpulan seluruh data: Nama: ${currentData.ownerName}, Hewan: ${currentData.petNameAndType}, Layanan: ${currentData.service}, Waktu: ${currentData.date} sesi [Waktu]. Akhiri kalimat persis dengan: "Mohon periksa kembali detail reservasi Anda di layar. Jika sudah benar, silakan klik 'Konfirmasi' untuk mengirim permintaan Anda kepada kami." HARAP BERIKAN RESPONSE FORMAT JSON: {"response": "jawaban ke user", "extractedTime": "Pagi/Sore"}`;
      
    default:
      return `${baseContext}Jawab dengan sopan: "${input}"`;
  }
}

export async function processVoiceInput(
  input: string, 
  step: BookingStep, 
  currentData: BookingData
): Promise<{ 
  reply: string, 
  nextStep: BookingStep, 
  newData: BookingData,
  showModal: boolean
}> {
  const currentKey = getApiKey();
  if (!currentKey) {
    return {
      reply: "Maaf, sistem AI sedang tidak bisa diakses (API Key hilang). Silakan hubungi nomor (021) 555-4567.",
      nextStep: step,
      newData: currentData,
      showModal: false
    };
  }

  try {
    const model = getModel();
    const prompt = getPromptForStep(step, input, currentData);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse JSON
    let parsed: any = {};
    try {
      // Find JSON block if wrapped in markdown
      const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsed = JSON.parse(jsonStr);
    } catch(e) {
      console.error("Failed to parse Gemini JSON output", responseText);
      return {
        reply: "Maaf, saya kurang mengerti. Bisa diulangi?",
        nextStep: step,
        newData: currentData,
        showModal: false
      };
    }

    let nextStep = step;
    let newData = { ...currentData };
    let showModal = false;

    // State machine transitions based on current step
    if (step === 'info' || step === 'greeting') {
      if (parsed.isStartingBooking) {
        nextStep = 'collect_name';
      }
    } else if (step === 'collect_name') {
      if (parsed.extractedName) {
        newData.ownerName = parsed.extractedName;
        nextStep = 'collect_pet';
      }
    } else if (step === 'collect_pet') {
      if (parsed.extractedPet) {
        newData.petNameAndType = parsed.extractedPet;
        nextStep = 'collect_service';
      }
    } else if (step === 'collect_service') {
      if (parsed.extractedService) {
        newData.service = parsed.extractedService;
        nextStep = 'collect_date';
      }
    } else if (step === 'collect_date') {
      if (parsed.extractedDate) {
        newData.date = parsed.extractedDate;
        nextStep = 'collect_time';
      }
    } else if (step === 'collect_time') {
      if (parsed.extractedTime) {
        newData.timeSlot = parsed.extractedTime;
        nextStep = 'confirm_ready';
        showModal = true;
      }
    }

    return {
      reply: parsed.response || "Baik.",
      nextStep,
      newData,
      showModal
    };

  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      reply: `Maaf, terjadi kesalahan pada engine AI: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
      nextStep: step,
      newData: currentData,
      showModal: false
    };
  }
}
