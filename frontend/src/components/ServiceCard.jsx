function ServiceCard({ image, title, description, onContact }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <img
        src={image}
        alt={`Imagen del servicio ${title}`}
        className="h-48 w-full object-cover"
        loading="lazy"
      />

      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-950">{title}</h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {description}
        </p>

        <button
          type="button"
          onClick={() => onContact(title)}
          className="mt-5 inline-flex rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
        >
          Contáctanos
        </button>
      </div>
    </article>
  )
}

export default ServiceCard