import { useSiteData } from "../data/useSiteData.js";

export default function Footer() {
  const siteData = useSiteData();

  return (
    <footer className="border-t border-white/10 bg-petroleum-950 py-10 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <div className="flex h-20 w-64 items-center justify-center border border-white/15 bg-white px-3">
            <img src={siteData.logo} alt="PRONTA Engenharia" className="h-full max-h-16 w-full object-contain" />
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/60">
            {siteData.legalName}. Empresa de engenharia, construção civil, montagem industrial e
            serviços técnicos sediada em {siteData.location}.
          </p>
        </div>
        <div className="text-sm leading-7 text-white/60 lg:text-right">
          <p>Domínio principal: {siteData.domain}</p>
          <p>Domínio adicional: {siteData.additionalDomain}</p>
          <p>Fundação: {siteData.foundedAt}</p>
          <p>© {new Date().getFullYear()} {siteData.brand}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
