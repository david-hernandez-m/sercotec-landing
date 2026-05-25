import { useEffect, useState } from 'react'
import { getServices, sendContact } from '../services/api'

function ContactForm({ selectedService }) {
  const [services, setServices] = useState([])

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: '',
    website: '',
  })

  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices()
        setServices(data)
      } catch (error) {
        setServerError(error.message)
      }
    }

    loadServices()
  }, [])

  useEffect(() => {
    if (selectedService) {
      setFormData((prevData) => ({
        ...prevData,
        servicio: selectedService,
      }))
    }
  }, [selectedService])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio.'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido.'
    }

    if (!formData.servicio.trim()) {
      newErrors.servicio = 'Debes seleccionar un servicio.'
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio.'
    }

    return newErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formData.website) {
      return
    }

    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setSuccessMessage('')
      setServerError('')
      return
    }

    try {
      setIsSubmitting(true)
      setErrors({})
      setServerError('')
      setSuccessMessage('')

      const response = await sendContact(formData)

      setSuccessMessage(response.message)

      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        servicio: '',
        mensaje: '',
        website: '',
      })
    } catch (error) {
      setServerError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="bg-slate-100 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Contacto
          </span>

          <h2 className="mt-3 text-3xl font-bold text-slate-950 md:text-4xl">
            Solicita orientación para tu negocio
          </h2>

          <p className="mt-4 text-slate-600">
            Completa el formulario y el equipo del Centro de Negocios Santiago
            podrá entregar apoyo según el servicio seleccionado.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
          noValidate
        >
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="hidden"
            tabIndex="-1"
            autoComplete="off"
          />

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="nombre"
                className="block text-sm font-semibold text-slate-700"
              >
                Nombre completo
              </label>

              <input
                id="nombre"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                placeholder="Ej: María González"
              />

              {errors.nombre && (
                <p className="mt-2 text-sm text-red-600">{errors.nombre}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                placeholder="correo@ejemplo.cl"
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="telefono"
                className="block text-sm font-semibold text-slate-700"
              >
                Teléfono
              </label>

              <input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                placeholder="+56 9 1234 5678"
              />
            </div>

            <div>
              <label
                htmlFor="servicio"
                className="block text-sm font-semibold text-slate-700"
              >
                Servicio seleccionado
              </label>

              <select
                id="servicio"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Selecciona un servicio</option>

                {services.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>

              {errors.servicio && (
                <p className="mt-2 text-sm text-red-600">{errors.servicio}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="mensaje"
              className="block text-sm font-semibold text-slate-700"
            >
              Mensaje
            </label>

            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              value={formData.mensaje}
              onChange={handleChange}
              className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
              placeholder="Cuéntanos brevemente qué necesita tu negocio."
            ></textarea>

            {errors.mensaje && (
              <p className="mt-2 text-sm text-red-600">{errors.mensaje}</p>
            )}
          </div>

          {serverError && (
            <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {serverError}
            </p>
          )}

          {successMessage && (
            <p className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactForm