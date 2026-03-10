import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Loader2, Send, BotMessageSquare } from 'lucide-react';
import { useVoice } from '../hooks/useVoice';
import { processVoiceInput } from '../services/ai';
import type { BookingStep, BookingData } from '../types/booking';
import { INITIAL_BOOKING_DATA } from '../types/booking';

interface AIButtonProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  showFloating: boolean; // true when user has scrolled past hero
}

export function AIButton({ isOpen, onOpenChange, showFloating }: AIButtonProps) {
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: 'Halo! Saya asisten PawParadise. Ada yang bisa saya bantu tentang layanan grooming atau pet hotel kami?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const { listen, speak, stopSpeaking, stopListening, isListening, hasSpeechRecognition } = useVoice();

  // Booking state
  const [bookingStep, setBookingStep] = useState<BookingStep>('info');
  const [bookingData, setBookingData] = useState<BookingData>(INITIAL_BOOKING_DATA);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Speak the greeting once when opened for the first time
  const hasGreetedRef = useRef(false);
  useEffect(() => {
    if (isOpen && !hasGreetedRef.current && voiceEnabled) {
      hasGreetedRef.current = true;
      speak(messages[0].text);
    }
  }, [isOpen]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleClose = () => {
    onOpenChange(false);
    stopSpeaking();
    stopListening();
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text }]);
    setInputText('');
    setIsProcessing(true);
    stopSpeaking();

    const result = await processVoiceInput(text, bookingStep, bookingData);

    setBookingData(result.newData);
    setBookingStep(result.nextStep);

    if (result.showModal) setShowConfirmModal(true);

    setMessages(prev => [...prev, { role: 'ai', text: result.reply }]);
    setIsProcessing(false);

    if (voiceEnabled) speak(result.reply);
  };

  const toggleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      stopSpeaking();
      listen(
        (transcript) => handleSend(transcript),
        (err) => setMessages(prev => [...prev, { role: 'ai', text: `*[Sistem]: ${err}*` }])
      );
    }
  };

  const cancelBooking = () => {
    setShowConfirmModal(false);
    setBookingStep('info');
    setBookingData(INITIAL_BOOKING_DATA);
    handleSend("Batal reservasi");
  };

  const editBooking = () => {
    setShowConfirmModal(false);
    setBookingStep('collect_name');
    handleSend("Saya ingin mengulang detail reservasi dari awal.");
  };

  const confirmBooking = () => {
    setShowConfirmModal(false);
    setBookingStep('done');
    const msg = "Terima kasih! Reservasi Anda telah masuk ke sistem kami. Tim admin akan segera memproses. Ada bantuan lain yang bisa saya berikan?";
    setMessages(prev => [...prev, { role: 'ai', text: msg }]);
    if (voiceEnabled) speak(msg);
  };

  return (
    <>
      {/* ── Floating trigger button (only visible when scrolled past hero) ── */}
      {showFloating && !isOpen && (
        <button
          onClick={() => onOpenChange(true)}
          className="fixed z-50 flex items-center gap-3 text-white px-6 py-4 rounded-full shadow-2xl transition-all duration-300 transform hover:-translate-y-1 font-bold
            bottom-6 left-1/2 -translate-x-1/2
            lg:left-auto lg:right-6 lg:translate-x-0"
          style={{ background: 'linear-gradient(135deg, #FF8C42, #FF6B9D)', boxShadow: '0 8px 32px rgba(255,140,66,0.45)', animation: 'fadeInUp 0.3s ease-out' }}
        >
          <div className="relative">
            <BotMessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          </div>
          Mulai Reservasi
        </button>
      )}

      {/* ── Chat widget (shown whenever isOpen is true) ── */}
      {isOpen && (
        <div
          className="fixed z-50 flex flex-col bg-white border border-orange-100 shadow-2xl rounded-2xl overflow-hidden
            bottom-0 left-0 right-0 w-full h-[75vh] rounded-b-none
            sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:w-[380px] sm:h-[550px] sm:max-h-[80vh] sm:rounded-2xl
            lg:left-auto lg:right-6 lg:translate-x-0"
          style={{ animation: 'fadeInUp 0.2s ease-out' }}>

          {/* Header */}
          <div className="px-6 py-4 border-b border-orange-100 flex justify-between items-center shrink-0" style={{ background: 'linear-gradient(135deg, #FFF0E0, #FFF0F8)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, #FF8C42, #FF6B9D)' }}>
                <span className="text-lg">🐾</span>
              </div>
              <div>
                <h3 className="font-black leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>PawParadise AI</h3>
                <p className="text-xs flex items-center gap-1" style={{ color: '#FF8C42' }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF8C42', display: 'inline-block' }}></span>
                  Online & Siap Bantu
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="transition-colors p-1 rounded-lg hover:bg-orange-100"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3`} style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #FF8C42, #FF6B9D)', color: 'white' } : { background: '#FFF0E0', color: 'var(--color-text)', border: '1px solid #FFD9B8' }}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text.replace(/\*\*/g, '')}</p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 flex items-center gap-2" style={{ background: '#FFF0E0', border: '1px solid #FFD9B8' }}>
                  <Loader2 className="w-4 h-4 animate-spin" style={{ color: '#FF8C42' }} />
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>AI sedang mengetik...</span>
                </div>
              </div>
            )}
            {isListening && (
              <p className="text-xs text-center text-[var(--color-text-muted)] animate-pulse">Mendengarkan...</p>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 shrink-0" style={{ background: '#FFF8F3', borderTop: '1px solid #FFD9B8' }}>
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => { setVoiceEnabled(!voiceEnabled); if (voiceEnabled) stopSpeaking(); }}
                className="p-2 rounded-full transition-colors"
                style={voiceEnabled ? { color: '#FF8C42', background: '#FFF0E0' } : { color: 'var(--color-text-muted)', background: 'transparent' }}
                title={voiceEnabled ? "Matikan Suara Output" : "Nyalakan Suara Output"}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <span className="text-xs flex-1" style={{ color: 'var(--color-text-muted)' }}>
                {voiceEnabled ? 'Suara Aktif' : 'Suara Nonaktif'}
              </span>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(inputText); }}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={hasSpeechRecognition ? "Ketik atau gunakan suara..." : "Ketik pesan Anda..."}
                className="w-full rounded-full pl-4 pr-24 py-3 text-sm focus:outline-none transition-colors"
              style={{ background: 'white', border: '1.5px solid #FFD9B8', color: 'var(--color-text)' }}
                disabled={isProcessing}
              />
              <div className="absolute right-1 flex items-center">
                {hasSpeechRecognition && (
                  <button
                    type="button"
                    onClick={toggleListen}
                    className="p-2 rounded-full transition-colors mr-1"
                    style={isListening ? { background: '#FFF0E0', color: '#FF8C42' } : { color: 'var(--color-text-muted)' }}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                )}
                <button
                  type="submit"
                  disabled={!inputText.trim() || isProcessing}
                  className="p-2 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  style={{ background: 'linear-gradient(135deg, #FF8C42, #FF6B9D)' }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Manual Booking Confirmation Modal ── */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[var(--color-secondary)] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Konfirmasi Reservasi</h3>
            <p className="text-[var(--color-text-muted)] text-sm mb-6">
              Mohon periksa kembali detail reservasi Anda di bawah ini:
            </p>
            <div className="space-y-4 bg-[#0F172A] p-4 rounded-xl border border-white/5 mb-8">
              <div className="flex flex-col">
                <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Nama Pemilik</span>
                <span className="text-white font-medium">{bookingData.ownerName}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Hewan</span>
                <span className="text-white font-medium">{bookingData.petNameAndType}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Layanan</span>
                <span className="text-[var(--color-accent)] font-bold">{bookingData.service}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Jadwal</span>
                <span className="text-white font-medium">{bookingData.date} - Sesi {bookingData.timeSlot}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={confirmBooking} className="flex-1 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white py-3 rounded-xl font-bold transition-colors">
                Konfirmasi
              </button>
              <button onClick={editBooking} className="flex-[0.5] bg-[#1E293B] hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl font-medium transition-colors">
                Ubah
              </button>
              <button onClick={cancelBooking} className="flex-[0.5] bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 py-3 rounded-xl font-medium transition-colors">
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
