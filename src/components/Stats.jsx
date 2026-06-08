import { siteData } from "../data/siteData.js";

export default function Stats() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl border-x border-stone-200 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {siteData.stats.map((stat) => (
          <div key={stat.label} className="border-b border-stone-200 py-8 sm:px-6 lg:border-b-0 lg:border-r last:lg:border-r-0">
            <p className="text-3xl font-semibold text-petroleum-900">{stat.value}</p>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-graphite-800/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
