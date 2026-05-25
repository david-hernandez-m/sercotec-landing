import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import TestimonialsCarousel from './components/TestimonialsCarousel'
import FAQSection from './components/FAQSection'
import ContactForm from './components/ContactForm'

function App() {
  const [selectedService, setSelectedService] = useState('')

  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName)

    setTimeout(() => {
      document.getElementById('contacto')?.scrollIntoView({
        behavior: 'smooth',
      })
    }, 100)
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection onContact={handleSelectService} />
      <TestimonialsCarousel />
      <FAQSection />
      <ContactForm selectedService={selectedService} />
    </main>
  )
}

export default App