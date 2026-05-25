import { useEffect, useState } from 'react'
import { getAbout } from '../services/api'

function AboutSection() {
  const [about, setAbout] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadAbout() {
      try {
        const data = await getAbout()
        setAbout(data)
      } catch (error) {
        setError(error.message)
      }
    }

    loadAbout()
  }, [])

  return (
    <section id="nosotros" className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Nosotros
          </span>

          <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
            {about?.title || 'Centro de Negocios Santiago'}
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            {about?.description ||
              'Cargando información del Centro de Negocios Santiago...'}
          </p>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>

        <div className="rounded-3xl bg-slate-100 p-8">
          <h3 className="text-xl font-bold text-slate-950">
            Información de contacto
          </h3>

          <div className="mt-5 space-y-4 text-slate-600">
            <p>
              <strong className="text-slate-800">Dirección:</strong>{' '}
              {about?.address || 'Cargando dirección...'}
            </p>

            <p>
              <strong className="text-slate-800">Correo:</strong>{' '}
              {about?.email || 'Cargando correo...'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection