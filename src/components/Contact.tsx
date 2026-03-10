import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-24" style={{ background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Final CTA banner */}
        <div className="rounded-3xl p-10 mb-16 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FF8C42, #FF6B9D)' }}>
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-4 left-8 text-6xl">🐾</div>
            <div className="absolute top-4 right-8 text-6xl">🐾</div>
            <div className="absolute bottom-4 left-24 text-5xl">🦴</div>
            <div className="absolute bottom-4 right-24 text-5xl">⭐</div>
          </div>
          <h2 className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Siap Booking untuk Anabul Anda? 🐶🐱
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Gunakan Asisten Suara AI kami untuk booking cepat tanpa ribet, atau hubungi kami langsung!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:0215554567" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1" style={{ background: 'white', color: 'var(--color-orange)' }}>
              <Phone className="w-5 h-5" />
              (021) 555-4567
            </a>
            <a href="https://wa.me/62215554567" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '2px solid rgba(255,255,255,0.4)' }}>
              <MessageCircle className="w-5 h-5" />
              WhatsApp Kami
            </a>
          </div>
        </div>

        {/* Map + Contact info */}
        <div className="grid lg:grid-cols-2 gap-8 rounded-3xl overflow-hidden shadow-xl" style={{ boxShadow: 'var(--card-shadow)' }}>
          {/* Info */}
          <div className="p-10" style={{ background: 'var(--color-bg-alt)' }}>
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6 badge-orange">
              Lokasi & Kontak 📍
            </span>
            <h3 className="text-3xl font-black mb-8" style={{ fontFamily: 'var(--font-display)' }}>Kunjungi Kami</h3>

            <div className="space-y-6">
              {[
                { icon: <MapPin className="w-5 h-5" />, color: 'var(--color-orange)', bg: '#FFF0E0', title: 'Alamat', value: 'Jl. Anabul No. 123, Distrik Pusat Kota\nJakarta 90210' },
                { icon: <Phone className="w-5 h-5" />,  color: 'var(--color-teal)',   bg: '#EDFFFE', title: 'Telepon', value: '(021) 555-4567' },
                { icon: <Clock className="w-5 h-5" />,  color: 'var(--color-purple)', bg: '#F3F0FF', title: 'Jam Operasional', value: 'Senin–Jumat: 08:00 – 20:00\nSabtu–Minggu: 09:00 – 17:00' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white" style={{ background: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold mb-0.5" style={{ color: 'var(--color-text)' }}>{item.title}</p>
                    <p className="text-sm whitespace-pre-line" style={{ color: 'var(--color-text-muted)' }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="min-h-[350px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.24072611634!2d106.745676!3d-6.229746499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi PawParadise Petcare"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
