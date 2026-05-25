import { useEffect, useState } from 'react'
import { getTestimonials } from '../services/api'

function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await getTestimonials()
        setTestimonials(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section id="testimonios" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Testimonios
          </span>

          <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
            Experiencias de emprendedores acompañados
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Historias de empresas y emprendedores que han recibido apoyo para
            fortalecer su gestión, innovación y crecimiento.
          </p>
        </div>

        {loading && (
          <p className="mt-10 text-center text-slate-600">
            Cargando testimonios...
          </p>
        )}

        {error && <p className="mt-10 text-center text-red-600">{error}</p>}

        {currentTestimonial && (
          <div
            className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12"
            aria-live="polite"
          >
            <p className="mx-auto max-w-3xl text-xl font-medium leading-9 text-slate-700">
              “{currentTestimonial.text}”
            </p>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-slate-950">
                {currentTestimonial.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {currentTestimonial.business}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={goToPrevious}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
                aria-label="Ver testimonio anterior"
              >
                Anterior
              </button>

              <div className="flex gap-2" aria-label="Indicadores del carrusel">
                {testimonials.map((testimonial, index) => (
                  <button
                    key={testimonial.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className={`h-3 w-3 rounded-full transition ${
                      currentIndex === index ? 'bg-blue-700' : 'bg-slate-300'
                    }`}
                    aria-label={`Ver testimonio ${index + 1}`}
                    aria-current={currentIndex === index ? 'true' : 'false'}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goToNext}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-200"
                aria-label="Ver siguiente testimonio"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default TestimonialsCarousel