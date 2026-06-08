import { siteData } from "../data/siteData.js";

export default function About() {
  return (
    <section id="sobre" className="section bg-stone-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="eyebrow">Sobre a empresa</p>
          <h2 className="section-title">Execução técnica com presença civil e industrial.</h2>
        </div>
        <div className="space-y-6 text-lg leading-8 text-graphite-800/80">
          <p>
            A PRONTA Engenharia atua desde 2013 oferecendo soluções em construção civil,
            montagem industrial, estruturas metálicas, instalações técnicas e serviços de
            engenharia.
          </p>
          <p>
            Com experiência em demandas industriais, comerciais e corporativas, a empresa
            trabalha com foco em segurança, qualidade, cumprimento de prazos e responsabilidade
            na execução.
          </p>
          <div className="grid gap-4 pt-4 sm:grid-cols-2">
            {siteData.areas.map(({ title, icon: Icon }) => (
              <div key={title} className="flex items-center gap-3 border border-stone-200 bg-white p-4 shadow-sm">
                <Icon className="shrink-0 text-ambercta" size={22} />
                <span className="font-semibold text-graphite-900">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
