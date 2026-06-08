import { ArrowUpRight } from "lucide-react";
import { siteData } from "../data/siteData.js";

export default function Contact() {
  return (
    <section id="contato" className="section bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="eyebrow">Contato</p>
          <h2 className="section-title">Solicite atendimento técnico para sua demanda.</h2>
          <p className="section-copy">
            O primeiro contato comercial da PRONTA Engenharia é direcionado pelo WhatsApp. Informe
            o tipo de serviço, local da demanda e prazo desejado para facilitar o retorno.
          </p>
          <a href={siteData.whatsappUrl} className="btn-primary mt-8" target="_blank" rel="noreferrer">
            Solicitar orçamento
            <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {siteData.contacts.map(({ label, value, icon: Icon }) => (
            <div key={label} className="border border-stone-200 bg-stone-50 p-6">
              <Icon className="mb-8 text-ambercta" size={28} />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-graphite-800/50">
                {label}
              </p>
              <p className="mt-3 break-words text-lg font-semibold leading-7 text-graphite-950">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
