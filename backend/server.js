import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

const app = express()

const PORT = process.env.PORT || 4000
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'sercotec-admin-2026'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(__dirname, 'data', 'db.json')

app.use(
  cors({
    origin: FRONTEND_URL,
  })
)

app.use(express.json())

function readDatabase() {
  const data = fs.readFileSync(dbPath, 'utf-8')
  return JSON.parse(data)
}

function writeDatabase(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2))
}

function validateAdminKey(req, res, next) {
  const apiKey = req.headers['x-api-key']

  if (!apiKey || apiKey !== ADMIN_API_KEY) {
    return res.status(401).json({
      message: 'No autorizado. API Key inválida o ausente.',
    })
  }

  next()
}

function validateRequiredFields(fields, body) {
  return fields.filter((field) => !body[field] || !body[field].toString().trim())
}

app.get('/', (req, res) => {
  res.json({
    message: 'API Centro de Negocios Santiago funcionando correctamente',
  })
})

app.get('/api/about', (req, res) => {
  const db = readDatabase()
  res.json(db.about)
})

app.put('/api/about', validateAdminKey, (req, res) => {
  const { title, description, address, email } = req.body

  const missingFields = validateRequiredFields(
    ['title', 'description', 'address', 'email'],
    req.body
  )

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Faltan campos obligatorios: ${missingFields.join(', ')}`,
    })
  }

  const db = readDatabase()

  db.about = {
    title,
    description,
    address,
    email,
  }

  writeDatabase(db)

  res.json({
    message: 'Información de Nosotros actualizada correctamente.',
    about: db.about,
  })
})

app.get('/api/services', (req, res) => {
  const db = readDatabase()
  res.json(db.services)
})

app.post('/api/services', validateAdminKey, (req, res) => {
  const { title, description, image } = req.body

  const missingFields = validateRequiredFields(
    ['title', 'description', 'image'],
    req.body
  )

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Faltan campos obligatorios: ${missingFields.join(', ')}`,
    })
  }

  const db = readDatabase()

  const newService = {
    id: Date.now(),
    title,
    description,
    image,
  }

  db.services.push(newService)
  writeDatabase(db)

  res.status(201).json({
    message: 'Servicio creado correctamente.',
    service: newService,
  })
})

app.put('/api/services/:id', validateAdminKey, (req, res) => {
  const id = Number(req.params.id)
  const { title, description, image } = req.body

  const missingFields = validateRequiredFields(
    ['title', 'description', 'image'],
    req.body
  )

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Faltan campos obligatorios: ${missingFields.join(', ')}`,
    })
  }

  const db = readDatabase()
  const index = db.services.findIndex((service) => service.id === id)

  if (index === -1) {
    return res.status(404).json({
      message: 'Servicio no encontrado.',
    })
  }

  db.services[index] = {
    id,
    title,
    description,
    image,
  }

  writeDatabase(db)

  res.json({
    message: 'Servicio actualizado correctamente.',
    service: db.services[index],
  })
})

app.delete('/api/services/:id', validateAdminKey, (req, res) => {
  const id = Number(req.params.id)

  const db = readDatabase()
  const exists = db.services.some((service) => service.id === id)

  if (!exists) {
    return res.status(404).json({
      message: 'Servicio no encontrado.',
    })
  }

  db.services = db.services.filter((service) => service.id !== id)
  writeDatabase(db)

  res.json({
    message: 'Servicio eliminado correctamente.',
  })
})

app.get('/api/testimonials', (req, res) => {
  const db = readDatabase()
  res.json(db.testimonials)
})

app.post('/api/testimonials', validateAdminKey, (req, res) => {
  const { name, business, text } = req.body

  const missingFields = validateRequiredFields(
    ['name', 'business', 'text'],
    req.body
  )

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Faltan campos obligatorios: ${missingFields.join(', ')}`,
    })
  }

  const db = readDatabase()

  const newTestimonial = {
    id: Date.now(),
    name,
    business,
    text,
  }

  db.testimonials.push(newTestimonial)
  writeDatabase(db)

  res.status(201).json({
    message: 'Testimonio creado correctamente.',
    testimonial: newTestimonial,
  })
})

app.put('/api/testimonials/:id', validateAdminKey, (req, res) => {
  const id = Number(req.params.id)
  const { name, business, text } = req.body

  const missingFields = validateRequiredFields(
    ['name', 'business', 'text'],
    req.body
  )

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Faltan campos obligatorios: ${missingFields.join(', ')}`,
    })
  }

  const db = readDatabase()
  const index = db.testimonials.findIndex((testimonial) => testimonial.id === id)

  if (index === -1) {
    return res.status(404).json({
      message: 'Testimonio no encontrado.',
    })
  }

  db.testimonials[index] = {
    id,
    name,
    business,
    text,
  }

  writeDatabase(db)

  res.json({
    message: 'Testimonio actualizado correctamente.',
    testimonial: db.testimonials[index],
  })
})

app.delete('/api/testimonials/:id', validateAdminKey, (req, res) => {
  const id = Number(req.params.id)

  const db = readDatabase()
  const exists = db.testimonials.some((testimonial) => testimonial.id === id)

  if (!exists) {
    return res.status(404).json({
      message: 'Testimonio no encontrado.',
    })
  }

  db.testimonials = db.testimonials.filter(
    (testimonial) => testimonial.id !== id
  )

  writeDatabase(db)

  res.json({
    message: 'Testimonio eliminado correctamente.',
  })
})

app.get('/api/faqs', (req, res) => {
  const db = readDatabase()
  res.json(db.faqs)
})

app.post('/api/faqs', validateAdminKey, (req, res) => {
  const { question, answer } = req.body

  const missingFields = validateRequiredFields(['question', 'answer'], req.body)

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Faltan campos obligatorios: ${missingFields.join(', ')}`,
    })
  }

  const db = readDatabase()

  const newFaq = {
    id: Date.now(),
    question,
    answer,
  }

  db.faqs.push(newFaq)
  writeDatabase(db)

  res.status(201).json({
    message: 'Pregunta frecuente creada correctamente.',
    faq: newFaq,
  })
})

app.put('/api/faqs/:id', validateAdminKey, (req, res) => {
  const id = Number(req.params.id)
  const { question, answer } = req.body

  const missingFields = validateRequiredFields(['question', 'answer'], req.body)

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Faltan campos obligatorios: ${missingFields.join(', ')}`,
    })
  }

  const db = readDatabase()
  const index = db.faqs.findIndex((faq) => faq.id === id)

  if (index === -1) {
    return res.status(404).json({
      message: 'Pregunta frecuente no encontrada.',
    })
  }

  db.faqs[index] = {
    id,
    question,
    answer,
  }

  writeDatabase(db)

  res.json({
    message: 'Pregunta frecuente actualizada correctamente.',
    faq: db.faqs[index],
  })
})

app.delete('/api/faqs/:id', validateAdminKey, (req, res) => {
  const id = Number(req.params.id)

  const db = readDatabase()
  const exists = db.faqs.some((faq) => faq.id === id)

  if (!exists) {
    return res.status(404).json({
      message: 'Pregunta frecuente no encontrada.',
    })
  }

  db.faqs = db.faqs.filter((faq) => faq.id !== id)
  writeDatabase(db)

  res.json({
    message: 'Pregunta frecuente eliminada correctamente.',
  })
})

app.get('/api/contacts', validateAdminKey, (req, res) => {
  const db = readDatabase()
  res.json(db.contacts)
})

app.post('/api/contact', (req, res) => {
  const { nombre, email, telefono, servicio, mensaje, website } = req.body

  if (website) {
    return res.status(400).json({
      message: 'Solicitud rechazada.',
    })
  }

  if (!nombre || !email || !servicio || !mensaje) {
    return res.status(400).json({
      message: 'Nombre, email, servicio y mensaje son obligatorios.',
    })
  }

  const emailRegex = /\S+@\S+\.\S+/

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'El correo electrónico no tiene un formato válido.',
    })
  }

  const db = readDatabase()

  const newContact = {
    id: Date.now(),
    nombre,
    email,
    telefono,
    servicio,
    mensaje,
    createdAt: new Date().toISOString(),
  }

  db.contacts.push(newContact)
  writeDatabase(db)

  res.status(201).json({
    message: 'Formulario recibido correctamente.',
    contact: newContact,
  })
})

app.listen(PORT, () => {
  console.log(`API funcionando en http://localhost:${PORT}`)
})