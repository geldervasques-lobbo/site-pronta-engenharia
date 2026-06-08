import { useSiteData } from "../data/useSiteData.js";

export default function About() {
  const siteData = useSiteData();

  return (
    <section id="sobre" className="section bg-stone-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="eyebrow">{siteData.about.eyebrow}</p>
          <h2 className="section-title">{siteData.about.title}</h2>
        </div>
        <div className="space-y-6 text-lg leading-8 text-graphite-800/80">
          {siteData.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
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
