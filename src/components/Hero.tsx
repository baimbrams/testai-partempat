import { BotMessageSquare } from 'lucide-react';

interface HeroProps {
  onOpenAI: () => void;
}

// Decorative SVG paw print
const PawPrint = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 60 55" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="10" rx="6" ry="8"/>
    <ellipse cx="28" cy="6"  rx="6" ry="7"/>
    <ellipse cx="44" cy="10" rx="6" ry="8"/>
    <ellipse cx="54" cy="24" rx="5" ry="7"/>
    <path d="M8 30 Q10 18 22 20 Q30 22 38 20 Q50 18 52 30 Q58 46 30 52 Q2 46 8 30Z"/>
  </svg>
);

export function Hero({ onOpenAI }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: 'linear-gradient(135deg, #FFF0E0 0%, #FFE4C8 50%, #FFF0F8 100%)' }}>
      
      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <PawPrint className="absolute top-24 left-8 w-12 h-12 text-orange-200 animate-float opacity-70" />
        <PawPrint className="absolute top-40 right-16 w-8 h-8 text-pink-200 animate-float2 opacity-60" />
        <PawPrint className="absolute bottom-32 left-1/4 w-10 h-10 text-yellow-200 animate-float opacity-50" />
        <PawPrint className="absolute bottom-24 right-1/3 w-6 h-6 text-teal-200 animate-float2 opacity-60" />
        <div className="absolute top-20 right-1/4 text-4xl animate-float2 opacity-40">🦴</div>
        <div className="absolute bottom-40 left-12 text-3xl animate-float opacity-40">⭐</div>
        <div className="absolute top-1/3 right-8 text-2xl animate-float2 opacity-30">🐾</div>
        {/* Big decorative circle blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #FFD166, transparent)' }}></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #FF6B9D, transparent)' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 font-semibold text-sm"
              style={{ background: '#FFF0E0', color: 'var(--color-orange)', border: '1.5px solid #FFCAA0' }}>
              <span>🏆</span> Peringkat #1 Petshop & Grooming 2026
            </div>

            <h1 className="text-5xl lg:text-6xl font-black mb-5 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Dedicated to Your Pet's
              <span className="block text-gradient-orange"> Well-Being,</span>
              <span className="block" style={{ color: 'var(--color-text)' }}>Where <span style={{ color: 'var(--color-pink)' }}>Care</span> Comes First!</span>
            </h1>

            <p className="text-lg mb-8 max-w-xl" style={{ color: 'var(--color-text-muted)' }}>
              Dari grooming lengkap hingga pet hotel ber-AC & CCTV. Lebih dari 5.000 pelanggan puas sejak 2015 — percayakan perawatan anabul Anda kepada kami!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                id="hero-ai-cta"
                onClick={onOpenAI}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg shadow-xl transition-all hover:-translate-y-1 hover:shadow-orange-300/60"
                style={{ background: 'linear-gradient(135deg, var(--color-orange), var(--color-pink))', boxShadow: '0 8px 24px rgba(255,140,66,0.35)' }}
              >
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ background: 'white' }}></span>
                  <BotMessageSquare className="relative w-5 h-5" />
                </span>
                Reservasi Layanan Sekarang
              </button>
              <a href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg border-2 transition-all hover:-translate-y-1"
                style={{ borderColor: 'var(--color-orange)', color: 'var(--color-orange)', background: 'white' }}>
                🐶 Lihat Layanan
              </a>
            </div>

            <p className="mt-5 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Atau hubungi: <a href="tel:0215554567" className="font-bold hover:underline" style={{ color: 'var(--color-orange)' }}>(021) 555-4567</a>
            </p>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap gap-6">
              {[['5K+', 'Pelanggan Puas', '#FFF0F8'], ['CCTV', 'Pantau 24/7', '#EDFFFE'], ['100%', 'Staff Bersertifikat', '#F3F0FF']].map(([val, label, bg]) => (
                <div key={label} className="flex flex-col items-center px-4 py-3 rounded-2xl shadow-sm" style={{ background: bg }}>
                  <span className="text-2xl font-black" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-orange)' }}>{val}</span>
                  <span className="text-xs font-semibold mt-1" style={{ color: 'var(--color-text-muted)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hero image */}
          <div className="relative hidden lg:flex justify-center items-center">
            <div className="relative w-[420px] h-[420px]">
              {/* Circular bg */}
              <div className="absolute inset-0 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #FFCAA0, #FFE4C8)' }}></div>
              <img
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=500"
                alt="Happy Golden Retriever"
                className="relative z-10 w-full h-full object-cover rounded-full shadow-2xl"
                style={{ boxShadow: '0 24px 60px rgba(255,140,66,0.3)' }}
              />
              {/* Floating cards */}
              <div className="absolute -bottom-4 -left-8 z-20 px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3" style={{ background: 'white' }}>
                <span className="text-2xl">✂️</span>
                <div>
                  <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>Grooming Terbaik</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Mulai Rp 100.000</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-8 z-20 px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3" style={{ background: 'white' }}>
                <span className="text-2xl">🏠</span>
                <div>
                  <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>Pet Hotel AC</p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Rp 75.000/malam</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#FFFFFF"/>
        </svg>
      </div>
    </section>
  );
}
