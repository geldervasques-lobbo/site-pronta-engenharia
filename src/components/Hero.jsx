import { ArrowRight, HardHat, ShieldCheck } from "lucide-react";
import { useSiteData } from "../data/useSiteData.js";

export default function Hero() {
  const siteData = useSiteData();

  return (
    <section id="inicio" className="section-hero relative isolate overflow-hidden bg-petroleum-950 pt-32 text-white">
      <div className="absolute inset-0 -z-10 opacity-35">
        <div className="industrial-grid h-full w-full" />
      </div>
      <div className="absolute right-0 top-20 -z-10 h-80 w-1/2 bg-[radial-gradient(circle_at_center,rgba(217,130,43,0.2),transparent_62%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
            <ShieldCheck size={18} className="text-ambercta" />
            {siteData.hero.eyebrow}
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {siteData.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{siteData.hero.subtitle}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={siteData.whatsappUrl} className="btn-primary justify-center" target="_blank" rel="noreferrer">
              Solicitar orçamento
              <ArrowRight size={18} />
            </a>
            <a href="#servicos" className="btn-secondary justify-center">
              Conhecer serviços
            </a>
          </div>
        </div>

        <div className="relative min-h-[380px] overflow-hidden border border-white/10 bg-white/10 p-6 shadow-2xl">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.11),transparent_38%),linear-gradient(45deg,transparent_0_52%,rgba(217,130,43,0.18)_52%_54%,transparent_54%)]" />
          <div className="relative grid h-full content-between gap-10">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-white/50">Base operacional</p>
                <p className="mt-2 text-2xl font-semibold">{siteData.location}</p>
              </div>
              <HardHat className="text-ambercta" size={42} strokeWidth={1.5} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {siteData.areas.slice(0, 4).map(({ title, icon: Icon }) => (
                <div key={title} className="border border-white/10 bg-petroleum-900/70 p-4">
                  <Icon className="mb-5 text-ambercta" size={26} strokeWidth={1.6} />
                  <p className="text-sm font-semibold leading-6 text-white">{title}</p>
                </div>
              ))}
            </div>
            <div className="border-l-4 border-ambercta bg-white/10 p-5">
              <p className="text-sm leading-6 text-white/75">{siteData.hero.technicalNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
