import {
  BadgeCheck,
  Blocks,
  Building2,
  Cable,
  Factory,
  Flame,
  Gauge,
  Hammer,
  HardHat,
  Landmark,
  MapPin,
  Phone,
  ShieldCheck,
  Snowflake,
  Truck,
  Wrench,
} from "lucide-react";

const whatsappNumber = "5571999712362";
const whatsappMessage =
  "Olá, gostaria de solicitar um orçamento com a PRONTA Engenharia.";

export const siteData = {
  brand: "PRONTA Engenharia",
  legalName: "Pronta Serviços de Construção Ltda",
  foundedAt: "10/01/2013",
  location: "Catu-BA",
  serviceRegion: "Nordeste",
  domain: "prontaengenharia.com.br",
  additionalDomain: "prontaengenharia.com",
  email: "pronta@prontaengenharia.com",
  whatsappDisplay: "(71) 99971-2362",
  whatsappUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  logo: "/logo-pronta.png",
  navItems: [
    { label: "Início", href: "#inicio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Serviços", href: "#servicos" },
    { label: "Setores", href: "#setores" },
    { label: "Diferenciais", href: "#diferenciais" },
    { label: "Contato", href: "#contato" },
  ],
  hero: {
    eyebrow: "Engenharia, construção civil e montagem industrial",
    title: "Soluções em Engenharia, Construção Civil e Montagem Industrial",
    subtitle:
      "Há mais de 13 anos executando obras, instalações e serviços técnicos para os setores industrial, comercial e de infraestrutura.",
    technicalNote:
      "Atuação técnica para demandas industriais, comerciais, corporativas e de infraestrutura, com foco em segurança, qualidade e responsabilidade.",
  },
  about: {
    eyebrow: "Sobre a empresa",
    title: "Execução técnica com presença civil e industrial.",
    paragraphs: [
      "A PRONTA Engenharia atua desde 2013 oferecendo soluções em construção civil, montagem industrial, estruturas metálicas, instalações técnicas e serviços de engenharia.",
      "Com experiência em demandas industriais, comerciais e corporativas, a empresa trabalha com foco em segurança, qualidade, cumprimento de prazos e responsabilidade na execução.",
    ],
  },
  servicesIntro: {
    eyebrow: "Serviços",
    title: "Soluções para obras, instalações e operações técnicas.",
    text:
      "Um conjunto de serviços voltado a contratantes que precisam de execução responsável, acompanhamento técnico e atendimento compatível com ambientes corporativos e industriais.",
  },
  sectorsIntro: {
    eyebrow: "Setores atendidos",
    title: "Atendimento para demandas técnicas em diferentes operações.",
    text:
      "A PRONTA Engenharia atua com soluções aplicáveis a ambientes industriais, comerciais, corporativos e de infraestrutura.",
  },
  differentialsIntro: {
    eyebrow: "Diferenciais",
    title: "Critérios técnicos para uma execução mais segura.",
  },
  cta: {
    eyebrow: "Orçamento",
    title: "Precisa de uma empresa técnica para executar sua obra ou serviço industrial?",
    text:
      "Conte com a PRONTA Engenharia para transformar demandas em soluções executadas com responsabilidade, segurança e eficiência.",
    button: "Falar com a PRONTA no WhatsApp",
  },
  contactIntro: {
    eyebrow: "Contato",
    title: "Solicite atendimento técnico para sua demanda.",
    text:
      "O primeiro contato comercial da PRONTA Engenharia é direcionado pelo WhatsApp. Informe o tipo de serviço, local da demanda e prazo desejado para facilitar o retorno.",
    button: "Solicitar orçamento",
  },
  stats: [
    { value: "13+", label: "anos de atuação" },
    { value: "2013", label: "empresa fundada" },
    { value: "Catu-BA", label: "base operacional" },
    { value: "Civil e industrial", label: "frentes de atuação" },
  ],
  areas: [
    { title: "Construção Civil", icon: Building2 },
    { title: "Montagem Industrial", icon: Factory },
    { title: "Estruturas Metálicas", icon: Blocks },
    { title: "Instalações Técnicas", icon: Cable },
    { title: "Engenharia e Gestão de Obras", icon: HardHat },
    { title: "Infraestrutura e Manutenção", icon: Wrench },
  ],
  services: [
    { title: "Construção civil", icon: Building2 },
    { title: "Reformas e ampliações", icon: Hammer },
    { title: "Montagem industrial", icon: Factory },
    { title: "Estruturas metálicas", icon: Blocks },
    { title: "Instalações elétricas", icon: Cable },
    { title: "Instalações hidráulicas", icon: Gauge },
    { title: "Sistemas de climatização, ventilação e refrigeração", icon: Snowflake },
    { title: "Sistemas de prevenção contra incêndio", icon: Flame },
    { title: "Terraplanagem", icon: Truck },
    { title: "Administração de obras", icon: Landmark },
    { title: "Serviços de engenharia", icon: BadgeCheck },
    { title: "Locação de máquinas e andaimes", icon: HardHat },
  ],
  sectors: [
    "Óleo e gás",
    "Mineração",
    "Indústria",
    "Construção civil",
    "Comércio e serviços",
    "Infraestrutura",
  ],
  differentials: [
    { title: "Mais de uma década de experiência", icon: BadgeCheck },
    { title: "Atuação em ambientes industriais", icon: Factory },
    { title: "Equipe técnica qualificada", icon: HardHat },
    { title: "Compromisso com segurança", icon: ShieldCheck },
    { title: "Gestão responsável da execução", icon: Gauge },
    { title: "Foco em prazo e qualidade", icon: Wrench },
  ],
  contacts: [
    { label: "WhatsApp", value: "(71) 99971-2362", icon: Phone },
    { label: "E-mail", value: "pronta@prontaengenharia.com", icon: Cable },
    { label: "Localização", value: "Catu-BA", icon: MapPin },
    { label: "Atendimento", value: "Nordeste, conforme demanda", icon: Landmark },
  ],
};
