import { ArrowRight } from "lucide-react";
import { useSiteData } from "../data/useSiteData.js";

export default function CTA() {
  const siteData = useSiteData();

  return (
    <section className="bg-graphite-950 py-16 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="eyebrow text-ambercta">{siteData.cta.eyebrow}</p>
          <h2 className="max-w-4xl text-3xl font-semibold leading-tight sm:text-4xl">
            {siteData.cta.title}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">{siteData.cta.text}</p>
        </div>
        <a href={siteData.whatsappUrl} className="btn-primary justify-center" target="_blank" rel="noreferrer">
          {siteData.cta.button}
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
