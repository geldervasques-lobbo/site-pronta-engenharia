import { useSiteData } from "../data/useSiteData.js";

export default function Differentials() {
  const siteData = useSiteData();

  return (
    <section id="diferenciais" className="section bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="eyebrow">{siteData.differentialsIntro.eyebrow}</p>
          <h2 className="section-title">{siteData.differentialsIntro.title}</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {siteData.differentials.map(({ title, icon: Icon }) => (
            <div key={title} className="border-l-4 border-ambercta bg-white p-6 shadow-sm">
              <Icon className="mb-7 text-petroleum-800" size={30} strokeWidth={1.7} />
              <h3 className="text-lg font-semibold leading-7 text-graphite-950">{title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
