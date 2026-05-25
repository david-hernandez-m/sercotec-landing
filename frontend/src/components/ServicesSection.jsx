import { useEffect, useState } from 'react'
import ServiceCard from './ServiceCard'
import { getServices } from '../services/api'

function ServicesSection({ onContact }) {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices()
        setServices(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  return (
    <section id="servicios" className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Servicios
          </span>

          <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
            Servicios de apoyo para emprendedores y empresas
          </h2>

          <p className="mt-4 text-slate-600">
            El Centro de Negocios Santiago entrega acompañamiento preventivo,
            correctivo y estratégico para fortalecer la gestión de sus clientes.
          </p>
        </div>

        {loading && (
          <p className="mt-10 text-slate-600">Cargando servicios...</p>
        )}

        {error && <p className="mt-10 text-red-600">{error}</p>}

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              image={service.image}
              title={service.title}
              description={service.description}
              onContact={onContact}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection