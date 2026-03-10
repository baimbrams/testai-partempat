const plans = [
  {
    emoji: '✂️',
    title: 'Grooming',
    price: '100.000',
    suffix: 'mulai dari',
    color: 'var(--color-orange)',
    bg: '#FFF0E0',
    features: ['Mandi Anti Kutu / Jamur', 'Potong & Rapikan Kuku', 'Pembersihan Telinga', 'Blow Dry & Styling'],
    popular: false,
  },
  {
    emoji: '🏠',
    title: 'Pet Hotel VIP',
    price: '75.000',
    suffix: '/ malam',
    color: 'var(--color-purple)',
    bg: '#F3F0FF',
    features: ['Kamar Full AC', 'Live CCTV Real-time', 'Jadwal Main Harian', 'Update Laporan via WA'],
    popular: true,
  },
  {
    emoji: '🩺',
    title: 'Konsultasi Dokter',
    price: '150.000',
    suffix: '/ sesi',
    color: 'var(--color-teal)',
    bg: '#EDFFFE',
    features: ['Cek Suhu & Berat Badan', 'Pemeriksaan Mata & Mulut', 'Saran Nutrisi Lengkap', 'Resep Obat (Jika Perlu)'],
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden" style={{ background: 'var(--color-bg-alt)' }}>
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,80 1440,40 L1440,0 L0,0 Z" fill="#FFFFFF"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 badge-purple">
            Daftar Harga 💰
          </span>
          <h2 className="text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Harga <span className="text-gradient-orange">Transparan</span>, Kualitas Terjamin
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Pilih layanan sesuai kebutuhan anabul Anda. Tidak ada biaya tersembunyi!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="relative rounded-3xl p-7 card-hover"
              style={{
                background: 'white',
                boxShadow: plan.popular ? `0 16px 48px ${plan.color}33` : 'var(--card-shadow)',
                border: plan.popular ? `2.5px solid ${plan.color}` : '2.5px solid transparent',
                transform: plan.popular ? 'scale(1.04)' : undefined,
              }}
            >
              {plan.popular && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="px-5 py-1.5 rounded-full text-xs font-black text-white shadow-lg" style={{ background: plan.color }}>
                    ⭐ Paling Diminati
                  </span>
                </div>
              )}

              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5" style={{ background: plan.bg }}>
                {plan.emoji}
              </div>

              <h3 className="text-2xl font-black mb-1" style={{ fontFamily: 'var(--font-display)' }}>{plan.title}</h3>
              <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>{plan.suffix}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm font-bold" style={{ color: 'var(--color-text-muted)' }}>Rp</span>
                <span className="text-4xl font-black" style={{ fontFamily: 'var(--font-display)', color: plan.color }}>{plan.price}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ background: plan.color }}>✓</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFFFFF"/>
        </svg>
      </div>
    </section>
  );
}
