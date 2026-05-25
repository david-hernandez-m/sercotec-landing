const API_URL = 'http://localhost:4000/api'

async function handleResponse(response) {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Ocurrió un error en la solicitud.')
  }

  return data
}

export async function getAbout() {
  const response = await fetch(`${API_URL}/about`)
  return handleResponse(response)
}

export async function getServices() {
  const response = await fetch(`${API_URL}/services`)
  return handleResponse(response)
}

export async function getTestimonials() {
  const response = await fetch(`${API_URL}/testimonials`)
  return handleResponse(response)
}

export async function getFaqs() {
  const response = await fetch(`${API_URL}/faqs`)
  return handleResponse(response)
}

export async function sendContact(formData) {
  const response = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  return handleResponse(response)
}