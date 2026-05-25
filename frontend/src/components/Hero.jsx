function Hero() {
  return (
    <section
      id="inicio"
      className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 pt-24 text-center"
    >
      <span className="mb-4 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
        Centro de Negocios Santiago
      </span>

      <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-6xl">
        Acompañamiento empresarial para micro, pequeñas y medianas empresas
      </h1>

      <p className="mt-6 max-w-2xl text-lg text-slate-600">
        Landing page moderna para presentar servicios, testimonios, preguntas
        frecuentes y un formulario de contacto para emprendedores.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <a
          href="#servicios"
          className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          Ver servicios
        </a>

        <a
          href="#contacto"
          className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-white"
        >
          Contáctanos
        </a>
      </div>
    </section>
  )
}

export default Hero