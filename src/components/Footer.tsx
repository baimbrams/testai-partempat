export function Footer() {
  return (
    <footer style={{ background: '#2D1B10' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐾</span>
              <span className="font-black text-2xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-orange)' }}>PawParadise</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#C9A880' }}>
              Perawatan profesional untuk hewan peliharaan kesayangan Anda. Berdiri sejak 2015 dengan dedikasi penuh.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-black mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-orange)' }}>Layanan</h4>
            <ul className="space-y-2">
              {['Grooming Lengkap', 'Pet Hotel VIP', 'Vaksinasi Tahunan', 'Konsultasi Dokter', 'Antar-Jemput'].map(s => (
                <li key={s}><a href="#services" className="text-sm hover:text-orange-400 transition-colors" style={{ color: '#C9A880' }}>{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-orange)' }}>Kontak</h4>
            <ul className="space-y-3 text-sm" style={{ color: '#C9A880' }}>
              <li>📍 Jl. Anabul No. 123, Pusat Kota, Jakarta 90210</li>
              <li>📞 (021) 555-4567</li>
              <li>🕐 Sen–Jumat 08:00–20:00</li>
              <li>🕐 Sab–Ming 09:00–17:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs" style={{ color: '#C9A880' }}>🐾 &copy; 2026 PawParadise Petcare. Hak Cipta Dilindungi.</p>
          <p className="text-xs" style={{ color: '#C9A880' }}>Dibuat dengan ❤️ untuk semua anabul</p>
        </div>
      </div>
    </footer>
  );
}
