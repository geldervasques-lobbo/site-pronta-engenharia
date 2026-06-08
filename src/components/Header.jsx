import { Menu, X } from "lucide-react";
import { useState } from "react";
import { siteData } from "../data/siteData.js";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-petroleum-950/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex items-center gap-3" aria-label="PRONTA Engenharia">
          <span className="flex h-12 w-40 items-center rounded bg-white px-3 shadow-sm sm:w-48">
            <img
              src={siteData.logo}
              alt="PRONTA Engenharia"
              className="h-auto max-h-10 w-full object-contain"
            />
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Menu principal">
          {siteData.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/80 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a href={siteData.whatsappUrl} className="btn-primary hidden lg:inline-flex" target="_blank" rel="noreferrer">
          Solicitar orçamento
        </a>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded border border-white/15 text-white lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-white/10 bg-petroleum-950 px-4 pb-5 pt-2 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1" aria-label="Menu mobile">
            {siteData.navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a
              href={siteData.whatsappUrl}
              className="btn-primary mt-3 justify-center"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              Solicitar orçamento
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
