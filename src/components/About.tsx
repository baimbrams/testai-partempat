import { Heart, ShieldCheck, Star } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: '#FFFFFF' }}>
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 text-6xl opacity-10 pointer-events-none">🐾</div>
      <div className="absolute bottom-10 left-10 text-5xl opacity-10 pointer-events-none">🦴</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 badge-orange">
            Tentang PawParadise 🐶
          </span>
          <h2 className="text-4xl font-black mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Lebih Dari Sekadar <span className="text-gradient-orange">Petshop</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Sejak 2015, kami hadir sebagai keluarga kedua anabul Anda — merawat dengan cinta, profesionalisme, dan standar medis terbaik.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image collage */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=600" alt="Dog grooming" className="rounded-3xl h-64 w-full object-cover shadow-lg col-span-1 row-span-2" style={{ boxShadow: '0 12px 32px rgba(255,140,66,0.2)' }} />
              <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400" alt="Happy cat" className="rounded-3xl h-30 w-full object-cover shadow-lg" style={{ boxShadow: '0 12px 32px rgba(255,107,157,0.2)', height: '120px' }} />
              <img src="https://images.unsplash.com/photo-1548199973-03c80f96845a?auto=format&fit=crop&q=80&w=400" alt="Dogs playing" className="rounded-3xl w-full object-cover shadow-lg" style={{ boxShadow: '0 12px 32px rgba(78,205,196,0.2)', height: '120px' }} />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3" style={{ background: 'white', border: '2px solid #FFF0E0' }}>
              <span className="text-3xl">🏆</span>
              <div>
                <p className="font-black text-sm" style={{ color: 'var(--color-text)' }}>#1 Petshop 2026</p>
                <div className="flex text-yellow-400">{'★'.repeat(5)}</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="space-y-6">
              {[
                { icon: <Heart className="w-6 h-6" />, color: 'var(--color-pink)', bg: '#FFF0F6', title: 'Dirawat dengan Cinta', desc: 'Setiap hewan peliharaan kami tangani seperti anggota keluarga sendiri. Tidak ada terburu-buru, tidak ada stres berlebihan.' },
                { icon: <ShieldCheck className="w-6 h-6" />, color: 'var(--color-teal)', bg: '#EDFFFE', title: 'Fasilitas Aman & Bersih', desc: 'Ruangan ber-AC, steril setiap hari, dan dipantau CCTV 24 jam yang bisa Anda akses dari HP kapan saja.' },
                { icon: <Star className="w-6 h-6" />, color: 'var(--color-yellow)', bg: '#FFFBEB', title: '11 Tahun Pengalaman', desc: 'Berdiri sejak 2015 dengan lebih dari 5.000 pelanggan puas — pengalaman terpercaya bicara sendiri.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-5 rounded-2xl card-hover" style={{ background: item.bg }}>
                  <div className="p-3 rounded-xl text-white flex-shrink-0" style={{ background: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-lg mb-1" style={{ fontFamily: 'var(--font-display)' }}>{item.title}</h3>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
