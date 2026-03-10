import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About.tsx';
import { Services } from './components/Services.tsx';
import { WhyUs } from './components/WhyUs.tsx';
import { Pricing } from './components/Pricing.tsx';
import { Testimonials } from './components/Testimonials.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { AIButton } from './components/AIButton.tsx';

function App() {
  const [aiOpen, setAiOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > window.innerHeight * 0.7);
      setNavScrolled(y > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg)', color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}>
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${navScrolled ? 'bg-white/95 shadow-md shadow-orange-100/50 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="font-bold text-xl tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-orange)' }}>PawParadise</span>
            </div>
            <div className="hidden md:flex items-center gap-7">
              {['#about', '#services', '#pricing', '#contact'].map((href, i) => (
                <a key={i} href={href} className="text-sm font-semibold transition-colors hover:text-orange-500" style={{ color: 'var(--color-text-muted)' }}>
                  {['Tentang Kami', 'Layanan', 'Harga', 'Lokasi'][i]}
                </a>
              ))}
              <button
                onClick={() => setAiOpen(true)}
                className="px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-lg hover:shadow-orange-300/50 transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, var(--color-orange), var(--color-pink))' }}
              >
                Reservasi Sekarang
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <Hero onOpenAI={() => setAiOpen(true)} />
        <About />
        <Services />
        <WhyUs />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <AIButton isOpen={aiOpen} onOpenChange={setAiOpen} showFloating={scrolled} />
    </div>
  );
}

export default App;
