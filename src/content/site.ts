/**
 * Todo o texto do portfólio fica aqui, em português e inglês lado a lado.
 * Para editar um projeto, uma experiência ou um link, mexa só neste arquivo.
 */

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];

type Localized<T = string> = Record<Locale, T>;

export const profile = {
  name: "Vitor Aguena",
  email: "vitoraguena17@gmail.com",
  location: "São Paulo, BR",
  timeZone: "America/Sao_Paulo",
  cv: "/cv/curriculo-vitor-aguena.pdf",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/vitoraguena/" },
    { label: "GitHub", href: "https://github.com/vitoraguena17" },
    { label: "WhatsApp", href: "https://wa.me/5511965265401" },
  ],
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: Localized;
  summary: Localized;
  stack: string[];
  image: { src: string; width: number; height: number; alt: Localized };
  href?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    slug: "apex",
    title: "Apex Dev Studio",
    year: "2026",
    role: {
      pt: "Cofundador · Software house web",
      en: "Co-founder · Web software house",
    },
    summary: {
      pt: "Estúdio que fundei com meu sócio para ajudar empresas a crescer no digital. Oferecemos desenvolvimento de sites, sistemas e apps, identidade visual, SEO e GEO, além de consultoria e tráfego pago. O site do estúdio, em quatro idiomas, reúne os serviços, os cases e o blog.",
      en: "A studio I founded with my business partner to help companies grow online. We offer websites, systems and apps, visual identity, SEO and GEO, plus consulting and paid traffic. The studio's site, in four languages, brings together our services, case studies and blog.",
    },
    stack: ["Next.js 16", "Cloudflare Workers", "D1 + Drizzle", "i18n"],
    image: {
      src: "/work/apex.jpg",
      width: 1920,
      height: 1400,
      alt: {
        pt: "Hero do site da Apex Dev Studio com o título A engenharia do seu crescimento digital",
        en: "Apex Dev Studio hero with the headline A engenharia do seu crescimento digital",
      },
    },
    href: "https://www.apexdevstudio.workers.dev",
  },
  {
    slug: "orbit",
    title: "Orbit",
    year: "2025 — 26",
    role: {
      pt: "Produto autoral · Full-stack",
      en: "Solo product · Full-stack",
    },
    summary: {
      pt: "Sistema de gestão financeira pessoal: contas, cartões, dívidas, metas e uma nota de saúde financeira. Importa extratos OFX e PDF no próprio aparelho, sugere categorias e aprende com cada correção.",
      en: "A personal finance management system: bills, cards, debts, goals and a financial health score. It imports OFX and PDF statements on-device, suggests categories and learns from every correction.",
    },
    stack: ["Next.js 16", "TypeScript", "Tailwind v4", "Firebase", "Cloudflare"],
    image: {
      src: "/work/orbit-app.jpg",
      width: 3200,
      height: 2347,
      alt: {
        pt: "Dois celulares com o painel da Orbit: resumo do mês, próximos vencimentos e balanço mensal",
        en: "Two phones showing the Orbit dashboard: monthly summary, upcoming bills and monthly balance",
      },
    },
    href: "https://orbit.apexdevstudio.workers.dev",
  },
  {
    slug: "f1-brasil",
    title: "F1 Brasil",
    year: "2026",
    role: {
      pt: "Homenagem · Estudo de front-end",
      en: "Tribute · Front-end study",
    },
    summary: {
      pt: "Uma homenagem aos grandes pilotos brasileiros contada pelo scroll: um carro percorre a pista enquanto você lê, cada piloto tem sua trilha e o legado do Senna entra em modo cinema.",
      en: "A tribute to Brazil's great drivers told through scroll: a car laps the track as you read, every driver has a soundtrack and Senna's legacy plays in cinema mode.",
    },
    stack: ["Next.js", "TypeScript", "GSAP", "Lenis", "Tailwind"],
    image: {
      src: "/work/f1-brasil.jpg",
      width: 2400,
      height: 1736,
      alt: {
        pt: "Hero do F1 Brasil com o título Lendas das Pistas e os cinco pilotos brasileiros lado a lado",
        en: "F1 Brasil hero with the title Lendas das Pistas and five Brazilian drivers side by side",
      },
    },
    href: "https://f1brasil.pages.dev/",
    repo: "https://github.com/vitoraguena17/f1-brasil",
  },
];

/** Projetos antigos, listados de forma compacta: mostram o caminho até aqui. */
export const archive: { title: string; year: string; stack: string; href: string }[] = [
  { title: "Café Austral", year: "2024", stack: "Java · JavaFX · MySQL", href: "https://github.com/GroundWave96/CafeAustralJava" },
  { title: "Portfólio v1", year: "2023", stack: "HTML · CSS", href: "https://vitoraguena17.github.io/Personal-Portfolio/" },
  { title: "Appletica", year: "2023", stack: "VB.NET", href: "https://github.com/vitoraguena17/Appletica" },
];

export const capabilities: { title: Localized; items: string[] }[] = [
  {
    title: { pt: "Front-end", en: "Front-end" },
    items: ["Angular", "React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
  },
  {
    title: { pt: "Back-end & integração", en: "Back-end & integration" },
    items: ["Java · Kotlin", "Node.js", "REST APIs · Proxies", "Firebase", "Cloudflare Workers", "Git · CI/CD"],
  },
  {
    title: { pt: "Dados & automação", en: "Data & automation" },
    items: ["Python · Pandas", "SQL", "Power BI · DAX", "SAP ERP", "VBA · Excel", "Web scraping"],
  },
  {
    title: { pt: "Design & produto", en: "Design & product" },
    items: ["Figma", "UI/UX", "Design systems", "a11y", "SEO", "i18n"],
  },
];

export type Experience = {
  period: Localized;
  title: Localized;
  place: string;
  text: Localized;
  tags: string[];
};

export const experience: Experience[] = [
  {
    period: { pt: "jun 2026 — hoje", en: "Jun 2026 — now" },
    title: { pt: "Desenvolvedor Front-end", en: "Front-end Developer" },
    place: "TOTVS",
    text: {
      pt: "Evolução de interfaces e arquitetura de plataformas corporativas. Integração com o back-end via APIs REST e proxies, refatoração de fluxos críticos como upload e processamento de arquivos, e code review apoiando as esteiras de CI/CD.",
      en: "Evolving interfaces and architecture for enterprise platforms. Back-end integration through REST APIs and proxies, refactoring critical flows such as file upload and processing, and code reviews backing the CI/CD pipelines.",
    },
    tags: ["Angular", "REST APIs", "Proxies", "Git", "CI/CD", "Code review"],
  },
  {
    period: { pt: "abr 2026 — hoje", en: "Apr 2026 — now" },
    title: { pt: "Cofundador & Desenvolvedor Web", en: "Co-founder & Web Developer" },
    place: "Apex Dev Studio",
    text: {
      pt: "Estúdio de desenvolvimento web que fundei com meu sócio. Atendemos empresas de ponta a ponta: levantamento de requisitos, identidade visual, protótipo no Figma, desenvolvimento sob medida, SEO e publicação, sem templates prontos. Também é a casa de produtos próprios, como a Orbit.",
      en: "A web development studio I founded with my business partner. We serve companies end to end: requirements, visual identity, Figma prototypes, custom development, SEO and launch, with no off-the-shelf templates. It is also home to in-house products like Orbit.",
    },
    tags: ["Next.js", "React", "TypeScript", "Figma", "SEO", "Cloudflare"],
  },
  {
    period: { pt: "mai 2025 — mai 2026", en: "May 2025 — May 2026" },
    title: { pt: "Estagiário → Consultor de TI", en: "IT Intern → IT Consultant" },
    place: "Master MR Tecnologia",
    text: {
      pt: "Automações B2B de ponta a ponta para regras de negócio e rotinas fiscais de clientes corporativos. Extrações de ERP (SAP), modelagem em SQL, dashboards em Power BI e robôs em Python e VBA que substituíram processos manuais. Efetivado como consultor, conduzi o handover técnico de todo o ecossistema.",
      en: "End-to-end B2B automations for business rules and tax routines of corporate clients. ERP (SAP) extractions, SQL modeling, Power BI dashboards and Python and VBA bots that replaced manual work. Hired as a consultant, I led the technical handover of the whole ecosystem.",
    },
    tags: ["Python", "SQL", "SAP", "Power BI", "DAX", "VBA", "Excel", "Web scraping"],
  },
  {
    period: { pt: "fev 2025 — mai 2025", en: "Feb 2025 — May 2025" },
    title: { pt: "Estagiário de TI", en: "IT Intern" },
    place: "Ministério Público Federal",
    text: {
      pt: "Infraestrutura e suporte: manutenção de hardware, rede em domínio com Micro Focus ZENworks, imagens de sistema padronizadas com Windows ADK e apoio às políticas de segurança da informação.",
      en: "Infrastructure and support: hardware maintenance, domain networking with Micro Focus ZENworks, standardized system images with Windows ADK and support for information security policies.",
    },
    tags: ["Hardware", "Networking", "ZENworks", "Windows ADK", "Infosec"],
  },
];

export const education = {
  place: "FATEC São Caetano do Sul",
  title: { pt: "Tecnólogo em Análise e Desenvolvimento de Sistemas", en: "Associate Degree in Systems Analysis and Development" },
  period: "2022 — 2026",
};

export const certifications = [
  "UI para Devs: fundamentos do design",
  "React: estruturando projetos com Vite",
  "Python para Automações & SAP ERP",
  "Logo Design: From Concept to Presentation",
  "HTML e CSS para projetos web",
];

export const dictionary = {
  pt: {
    meta: {
      title: "Vitor Aguena — Desenvolvedor Front-end",
      description:
        "Portfólio de Vitor Aguena, desenvolvedor front-end na TOTVS e cofundador da Apex Dev Studio. Interfaces rápidas e acessíveis, com dados e regra de negócio por trás.",
    },
    nav: { work: "Projetos", about: "Sobre", experience: "Trajetória", contact: "Contato" },
    skip: "Pular para o conteúdo",
    menu: { open: "Abrir menu", close: "Fechar menu" },
    switchLanguage: { label: "EN", aria: "Read in English", href: "/en" },
    status: "Aberto a novas conversas",
    cv: "Currículo",
    hero: {
      eyebrow: "Desenvolvedor de Software",
      lines: ["Interfaces com", "*precisão* e", "personalidade."],
      intro:
        "Sou Vitor Aguena, desenvolvedor front-end na TOTVS e cofundador da Apex Dev Studio. Uno interface, dados e regra de negócio para criar experiências web rápidas, acessíveis e cheias de detalhe.",
      primary: "Ver projetos",
      secondary: "Fale comigo",
      scroll: "Role para explorar",
    },
    work: {
      label: "Projetos selecionados",
      title: ["Trabalho que", "*acelera* ideias."],
      visit: "Visitar",
      code: "Código",
      archive: "Arquivo",
    },
    about: {
      label: "Sobre",
      title: ["Do hardware", "ao *pixel*."],
      paragraphs: [
        "Comecei pela infraestrutura: no Ministério Público Federal cuidei de hardware, redes e padronização de máquinas. Na Master MR mergulhei em dados e automação, com robôs em Python e VBA, extrações de SAP e dashboards em Power BI para as rotinas fiscais de clientes corporativos.",
        "Hoje sou desenvolvedor front-end na TOTVS e cofundador da Apex Dev Studio, onde criamos sites, sistemas e identidades visuais sob medida, sempre com a tecnologia que cada projeto pede.",
      ],
      facts: [
        { value: "2022", label: "programando desde" },
        { value: "4", label: "empresas" },
        { value: "EN", label: "inglês avançado" },
      ],
      photoAlt: "Retrato de Vitor Aguena, de óculos e moletom escuro",
      photoHint: "Ver em cores",
      capabilities: "O que eu uso",
    },
    experience: { label: "Trajetória", title: ["O caminho", "até *aqui*."], education: "Formação", certifications: "Certificações" },
    contact: {
      label: "Contato",
      title: ["Vamos construir", "algo *juntos*?"],
      text: "Tem um projeto, uma vaga ou só quer trocar uma ideia? Respondo rápido.",
      copy: "Copiar e-mail",
      copied: "Copiado!",
      local: "Horário local",
    },
    footer: {
      rights: "Todos os direitos reservados.",
      top: "Voltar ao topo",
      built: "Feito à mão com Next.js e Tailwind",
      tagline: "Desenvolvedor de software em São Paulo. Interface, dados e regra de negócio no mesmo lugar.",
      menu: "Navegação",
      social: "Redes",
    },
  },
  en: {
    meta: {
      title: "Vitor Aguena — Front-end Developer",
      description:
        "Portfolio of Vitor Aguena, front-end developer at TOTVS and co-founder of Apex Dev Studio. Fast, accessible interfaces backed by data and business logic.",
    },
    nav: { work: "Work", about: "About", experience: "Journey", contact: "Contact" },
    skip: "Skip to content",
    menu: { open: "Open menu", close: "Close menu" },
    switchLanguage: { label: "PT", aria: "Ler em português", href: "/" },
    status: "Open to new conversations",
    cv: "Résumé (PT)",
    hero: {
      eyebrow: "Software Developer",
      lines: ["Interfaces with", "*precision* and", "personality."],
      intro:
        "I'm Vitor Aguena, front-end developer at TOTVS and co-founder of Apex Dev Studio. I bring interface, data and business logic together into fast, accessible, detail-driven web experiences.",
      primary: "See my work",
      secondary: "Get in touch",
      scroll: "Scroll to explore",
    },
    work: {
      label: "Selected work",
      title: ["Work that", "*accelerates* ideas."],
      visit: "Visit",
      code: "Code",
      archive: "Archive",
    },
    about: {
      label: "About",
      title: ["From hardware", "to *pixel*."],
      paragraphs: [
        "I started in infrastructure: at Brazil's Federal Prosecution Service I handled hardware, networks and standardized machines. At Master MR I dove into data and automation, building Python and VBA bots, SAP extractions and Power BI dashboards for corporate clients' tax routines.",
        "Today I'm a front-end developer at TOTVS and co-founder of Apex Dev Studio, where we build custom websites, systems and visual identities, always with the technology each project calls for.",
      ],
      facts: [
        { value: "2022", label: "coding since" },
        { value: "4", label: "companies" },
        { value: "EN", label: "advanced English" },
      ],
      photoAlt: "Portrait of Vitor Aguena wearing glasses and a dark hoodie",
      photoHint: "See in color",
      capabilities: "What I use",
    },
    experience: { label: "Journey", title: ["The road", "so *far*."], education: "Education", certifications: "Certifications" },
    contact: {
      label: "Contact",
      title: ["Let's build", "something *together*?"],
      text: "Have a project, a role or just want to chat? I reply fast.",
      copy: "Copy email",
      copied: "Copied!",
      local: "Local time",
    },
    footer: {
      rights: "All rights reserved.",
      top: "Back to top",
      built: "Hand-built with Next.js and Tailwind",
      tagline: "Software developer in São Paulo. Interface, data and business logic in one place.",
      menu: "Navigation",
      social: "Social",
    },
  },
} satisfies Record<Locale, unknown>;

export type Dictionary = (typeof dictionary)[Locale];
