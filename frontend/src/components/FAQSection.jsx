import { useEffect, useState } from 'react'
import { getFaqs } from '../services/api'

function FAQSection() {
  const [faqs, setFaqs] = useState([])
  const [openId, setOpenId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadFaqs() {
      try {
        const data = await getFaqs()
        setFaqs(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadFaqs()
  }, [])

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq" className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Preguntas frecuentes
          </span>

          <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
            Dudas comunes sobre el acompañamiento
          </h2>

          <p className="mt-4 text-slate-600">
            Respuestas rápidas para orientar a emprendedores y empresas
            interesadas en recibir apoyo.
          </p>
        </div>

        {loading && (
          <p className="mt-10 text-center text-slate-600">
            Cargando preguntas frecuentes...
          </p>
        )}

        {error && <p className="mt-10 text-center text-red-600">{error}</p>}

        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <article
              key={faq.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="flex w-full items-center justify-between gap-4 text-left"
                aria-expanded={openId === faq.id}
              >
                <span className="font-bold text-slate-950">
                  {faq.question}
                </span>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-700">
                  {openId === faq.id ? '-' : '+'}
                </span>
              </button>

              {openId === faq.id && (
                <p className="mt-4 leading-7 text-slate-600">{faq.answer}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection