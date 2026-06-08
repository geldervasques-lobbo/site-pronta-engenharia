import { Factory, MoveRight } from "lucide-react";
import { useSiteData } from "../data/useSiteData.js";

export default function Sectors() {
  const siteData = useSiteData();

  return (
    <section id="setores" className="section bg-petroleum-900 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <p className="eyebrow text-ambercta">{siteData.sectorsIntro.eyebrow}</p>
          <h2 className="section-title text-white">{siteData.sectorsIntro.title}</h2>
          <p className="mt-6 text-lg leading-8 text-white/70">{siteData.sectorsIntro.text}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {siteData.sectors.map((sector) => (
            <div key={sector} className="flex items-center justify-between border border-white/10 bg-white/10 p-5">
              <span className="flex items-center gap-3 font-semibold">
                <Factory size={20} className="text-ambercta" />
                {sector}
              </span>
              <MoveRight size={18} className="text-white/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
