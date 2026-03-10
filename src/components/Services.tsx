const services = [
  {
    emoji: '✂️',
    title: 'Grooming Lengkap',
    desc: 'Mandi aromaterapi, potong kuku, pembersihan telinga, dan styling sesuai ras.',
    color: 'var(--color-orange)',
    bg: '#FFF0E0',
    badge: 'Favorit!'
  },
  {
    emoji: '🏠',
    title: 'Pet Hotel VIP',
    desc: 'Penitipan nyaman dengan AC, CCTV live, tempat tidur empuk, dan jadwal main harian.',
    color: 'var(--color-purple)',
    bg: '#F3F0FF',
    badge: 'Terlaris'
  },
  {
    emoji: '💉',
    title: 'Vaksinasi Tahunan',
    desc: 'Perlindungan maksimal dari penyakit melalui program vaksin berkala sesuai jadwal.',
    color: 'var(--color-teal)',
    bg: '#EDFFFE',
    badge: null
  },
  {
    emoji: '🩺',
    title: 'Konsultasi Dokter',
    desc: 'Pemeriksaan kesehatan dasar oleh dokter hewan berpengalaman, lengkap dengan saran nutrisi.',
    color: 'var(--color-pink)',
    bg: '#FFF0F6',
    badge: null
  },
  {
    emoji: '🚗',
    title: 'Antar-Jemput',
    desc: 'Layanan penjemputan dan pengantaran hewan peliharaan Anda langsung dari depan rumah.',
    color: 'var(--color-green)',
    bg: '#F0FFF4',
    badge: 'Baru!'
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden" style={{ background: 'var(--color-bg-alt)' }}>
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,80 1440,40 L1440,0 L0,0 Z" fill="#FFFFFF"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 badge-pink">
            Layanan Kami 🐾
          </span>
          <h2 className="text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Solusi Lengkap <span className="text-gradient-orange">Perawatan Anabul</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Semua yang dibutuhkan hewan peliharaan Anda tersedia di satu tempat dengan standar kualitas tertinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="relative rounded-3xl p-6 card-hover cursor-pointer group" style={{ background: 'white', boxShadow: 'var(--card-shadow)' }}>
              {s.badge && (
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: s.color }}>
                  {s.badge}
                </span>
              )}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 transition-transform group-hover:scale-110" style={{ background: s.bg }}>
                {s.emoji}
              </div>
              <h3 className="text-xl font-black mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{s.desc}</p>
              <div className="mt-4 flex items-center gap-1 font-bold text-sm" style={{ color: s.color }}>
                Selengkapnya
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFFFFF"/>
        </svg>
      </div>
    </section>
  );
}
