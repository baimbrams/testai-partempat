const features = [
  { emoji: '🧹', color: 'var(--color-orange)', bg: '#FFF0E0', title: 'Fasilitas Ekstra Bersih', desc: 'Ruangan disterilkan setiap hari sesuai standar medis hewan.' },
  { emoji: '🎓', color: 'var(--color-purple)', bg: '#F3F0FF', title: 'Groomer Bersertifikat', desc: 'Semua staf telah menjalani pelatihan khusus pet handling & first-aid.' },
  { emoji: '📹', color: 'var(--color-teal)', bg: '#EDFFFE', title: 'CCTV Live di HP Anda', desc: 'Pantau anabul kapan saja langsung dari smartphone Anda.' },
  { emoji: '🌡️', color: 'var(--color-pink)', bg: '#FFF0F6', title: 'AC Sepanjang Waktu', desc: 'Pet hotel kami beroperasi dengan suhu ruangan yang selalu nyaman.' },
  { emoji: '🚒', color: 'var(--color-green)', bg: '#F0FFF4', title: 'Siap Darurat 24 Jam', desc: 'Staf siaga dan jalur komunikasi darurat selalu terbuka.' },
  { emoji: '💰', color: 'var(--color-yellow)', bg: '#FFFBEB', title: 'Harga Transparan', desc: 'Tidak ada biaya tersembunyi. Semua harga tertera jelas sejak awal.' },
];

export function WhyUs() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: '#FFFFFF' }}>
      <div className="absolute top-8 right-8 text-8xl opacity-5 pointer-events-none select-none">🐱</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Left sticky text */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-5 badge-teal">
              Mengapa Memilih Kami 🏅
            </span>
            <h2 className="text-4xl font-black mb-5" style={{ fontFamily: 'var(--font-display)' }}>
              Standar Kepedulian <span className="text-gradient-orange">Terbaik</span> untuk Anabul
            </h2>
            <p className="text-lg mb-8" style={{ color: 'var(--color-text-muted)' }}>
              Kami tidak sekadar memberikan layanan. Kami memastikan setiap momen perawatan adalah pengalaman positif.
            </p>
            <img
              src="https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&q=80&w=600"
              alt="Groomer petting dog"
              className="rounded-3xl shadow-xl w-full object-cover"
              style={{ maxHeight: '280px', boxShadow: '0 16px 48px rgba(255,140,66,0.2)' }}
            />
          </div>

          {/* Right feature grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="p-5 rounded-3xl card-hover" style={{ background: f.bg }}>
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="font-black text-lg mb-1" style={{ fontFamily: 'var(--font-display)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
