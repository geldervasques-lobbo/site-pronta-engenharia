import { ArrowRight } from "lucide-react";
import { siteData } from "../data/siteData.js";

export default function CTA() {
  return (
    <section className="bg-graphite-950 py-16 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="eyebrow text-ambercta">Orçamento</p>
          <h2 className="max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">
            Precisa de uma empresa técnica para executar sua obra ou serviço industrial?
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
            Conte com a PRONTA Engenharia para transformar demandas em soluções executadas com
            responsabilidade, segurança e eficiência.
          </p>
        </div>
        <a href={siteData.whatsappUrl} className="btn-primary justify-center" target="_blank" rel="noreferrer">
          Falar com a PRONTA no WhatsApp
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
