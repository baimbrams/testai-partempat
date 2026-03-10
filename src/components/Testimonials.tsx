const testimonials = [
  {
    name: 'Budi Santoso',
    pet: 'Pemilik Maxi 🐕 Golden Retriever',
    avatar: 'B',
    color: 'var(--color-orange)',
    bg: '#FFF0E0',
    stars: 5,
    text: '"Layanan Grooming terbaik di Jakarta! Maxi biasanya rewel, tapi di PawParadise ia santai banget. Bulunya wangi dan potongannya rapi. Kami pasti balik lagi!"',
    img: 'https://images.unsplash.com/photo-1537111682038-d3de00c2ee9a?auto=format&fit=crop&w=80&q=80',
  },
  {
    name: 'Siti Rahma',
    pet: 'Pemilik Luna 🐱 Persia',
    avatar: 'S',
    color: 'var(--color-purple)',
    bg: '#F3F0FF',
    stars: 5,
    text: '"Pet Hotel-nya bersih banget! Saya bisa pantau Luna lewat CCTV HP kapan saja. Sangat tenang saat harus dinas luar kota. Staff-nya juga responsif banget via WA!"',
    img: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?auto=format&fit=crop&w=80&q=80',
  },
  {
    name: 'Anton Wijaya',
    pet: 'Pemilik Mochi 🐕 Pomeranian',
    avatar: 'A',
    color: 'var(--color-teal)',
    bg: '#EDFFFE',
    stars: 5,
    text: '"Dokter hewannya sangat informatif dan ramah. Biaya konsultasinya juga sangat masuk akal. Rekomendasi saya #1 untuk teman-teman yang cari petshop terpercaya!"',
    img: 'https://images.unsplash.com/photo-1593134257782-e89567b7718a?auto=format&fit=crop&w=80&q=80',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'var(--color-bg-alt)' }}>
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,0 1080,80 1440,40 L1440,0 L0,0 Z" fill="#FFFFFF"/>
        </svg>
      </div>

      {/* Decorative */}
      <div className="absolute bottom-8 right-8 text-7xl opacity-5 pointer-events-none select-none">🐶</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 badge-orange">
            Testimoni 💬
          </span>
          <h2 className="text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Kata Mereka tentang <span className="text-gradient-orange">PawParadise</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-3xl p-6 card-hover" style={{ background: 'white', boxShadow: 'var(--card-shadow)', borderTop: `4px solid ${t.color}` }}>
              <div className="flex text-yellow-400 mb-4">{'★'.repeat(t.stars)}</div>
              <p className="text-sm leading-relaxed italic mb-6" style={{ color: 'var(--color-text-muted)' }}>{t.text}</p>
              <div className="flex items-center gap-3">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  style={{ border: `2px solid ${t.color}` }}
                />
                <div>
                  <p className="font-black" style={{ color: 'var(--color-text)' }}>{t.name}</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{t.pet}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ratings bar */}
        <div className="mt-14 flex flex-wrap justify-center gap-8 items-center">
          <div className="text-center">
            <p className="text-5xl font-black" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-orange)' }}>4.9</p>
            <div className="flex justify-center text-yellow-400 text-xl">{'★'.repeat(5)}</div>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Rata-rata rating</p>
          </div>
          <div className="w-px h-16 bg-gray-200 hidden md:block"></div>
          <div className="text-center">
            <p className="text-5xl font-black" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pink)' }}>500+</p>
            <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>Review bintang 5</p>
          </div>
          <div className="w-px h-16 bg-gray-200 hidden md:block"></div>
          <div className="text-center">
            <p className="text-5xl font-black" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-teal)' }}>98%</p>
            <p className="text-sm mt-2" style={{ color: 'var(--color-text-muted)' }}>Pelanggan kembali lagi</p>
          </div>
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
