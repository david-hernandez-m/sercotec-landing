function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="text-lg font-bold text-blue-700">
          Centro Santiago
        </a>

        <div className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <a href="#nosotros" className="hover:text-blue-700">
            Nosotros
          </a>

          <a href="#servicios" className="hover:text-blue-700">
            Servicios
          </a>

          <a href="#testimonios" className="hover:text-blue-700">
            Testimonios
          </a>

          <a href="#faq" className="hover:text-blue-700">
            Preguntas frecuentes
          </a>

          <a
            href="#contacto"
            className="rounded-xl bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
          >
            Contáctanos
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar