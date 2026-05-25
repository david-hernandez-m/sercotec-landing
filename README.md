# Landing Page Centro de Negocios Santiago - SERCOTEC

Proyecto desarrollado para actualizar la presencia web del Centro de Negocios Santiago de SERCOTEC mediante una landing page moderna, dinámica, reutilizable y administrable.

## Objetivo del proyecto

Diseñar e implementar una landing page utilizando React, Vite y Tailwind CSS, integrando componentes reutilizables, consumo de API, formulario de contacto, validaciones, accesibilidad, usabilidad y documentación técnica.

## Tecnologías utilizadas

- React
- Vite
- Tailwind CSS
- Node.js
- Express
- Postman
- Git
- GitHub

## Estructura del proyecto

```text
sercotec-landing/
├── backend/
│   ├── data/
│   │   └── db.json
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── docs/
│   ├── buenas-practicas.md
│   └── cms-postman.md
│
├── .gitignore
└── README.md
```

## Instalación del frontend

Entrar a la carpeta del frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

El frontend se ejecuta en:

```text
http://localhost:5173
```

## Instalación del backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el servidor:

```bash
npm run dev
```

El backend se ejecuta en:

```text
http://localhost:4000
```

## Componentes principales

### Navbar

Componente de navegación principal con enlaces a las secciones de la landing page.

### Hero

Sección inicial de presentación del Centro de Negocios Santiago.

### AboutSection

Sección “Nosotros”, que consume información desde la API interna.

### ServiceCard

Componente reutilizable para mostrar servicios. Recibe imagen, título, descripción y acción de contacto.

Ejemplo:

```jsx
<ServiceCard
  image={service.image}
  title={service.title}
  description={service.description}
  onContact={onContact}
/>
```

### ServicesSection

Sección que muestra dinámicamente los servicios obtenidos desde la API.

### TestimonialsCarousel

Carrusel de testimonios adaptable a escritorio y dispositivos móviles.

### FAQSection

Sección de preguntas frecuentes con interacción desplegable.

### ContactForm

Formulario de contacto con validación del lado del cliente y envío de datos al backend.

## API interna / CMS

El backend funciona como un CMS simple administrable desde Postman.

Endpoints principales:

```text
GET    /api/about
GET    /api/services
POST   /api/services
PUT    /api/services/:id
DELETE /api/services/:id
GET    /api/testimonials
GET    /api/faqs
POST   /api/contact
GET    /api/contacts
```

Las rutas administrativas utilizan API Key mediante el header:

```text
x-api-key: sercotec-admin-2026
```

La guía completa de uso se encuentra en:

```text
docs/cms-postman.md
```

## Accesibilidad y usabilidad

El proyecto considera:

- Navegación clara por secciones.
- Botones visibles y comprensibles.
- Formularios con etiquetas asociadas.
- Validaciones con mensajes de error.
- Carrusel con atributos ARIA.
- Diseño adaptable a dispositivos móviles y escritorio.
- Selección automática del servicio al presionar “Contáctanos”.

## Seguridad

Se implementaron medidas como:

- Validación de campos obligatorios.
- Validación de formato de correo electrónico.
- Validación del lado del cliente.
- Validación del lado del servidor.
- Campo oculto honeypot para reducir envíos automatizados.
- Protección de rutas administrativas mediante API Key.

## Optimización

Se aplicaron buenas prácticas como:

- Uso de componentes reutilizables.
- Separación de lógica de consumo API.
- Carga diferida de imágenes con `loading="lazy"`.
- Estructura modular.
- Uso de Vite para desarrollo eficiente.

## Documentación adicional

El proyecto incluye documentación en la carpeta `docs`:

```text
docs/buenas-practicas.md
docs/cms-postman.md
```

## Control de versiones

El proyecto fue gestionado con Git y GitHub mediante commits descriptivos.

Ejemplos de commits utilizados:

```text
Inicializa proyecto SERCOTEC con frontend backend y documentacion
Documenta CMS con Postman y buenas practicas
Agrega README principal del proyecto
```

## Repositorio

Repositorio público del proyecto:

```text
https://github.com/david-hernandez-m/sercotec-landing.git
```