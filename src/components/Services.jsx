import { siteData } from "../data/siteData.js";

export default function Services() {
  return (
    <section id="servicos" className="section bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow">Serviços</p>
          <h2 className="section-title">Soluções para obras, instalações e operações técnicas.</h2>
          <p className="section-copy">
            Um conjunto de serviços voltado a contratantes que precisam de execução responsável,
            acompanhamento técnico e atendimento compatível com ambientes corporativos e industriais.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteData.services.map(({ title, icon: Icon }) => (
            <article key={title} className="group border border-stone-200 bg-stone-50 p-6 transition hover:-translate-y-1 hover:border-petroleum-700 hover:bg-white hover:shadow-industrial">
              <Icon className="mb-8 text-petroleum-800 transition group-hover:text-ambercta" size={30} strokeWidth={1.7} />
              <h3 className="text-lg font-semibold leading-7 text-graphite-950">{title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
