const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(
    /\/$/,
    ""
  ) ?? "http://localhost:3000";

export const siteConfig = {
  name: "Jefferson Lopes",

  title:
    "Jefferson Lopes — Desenvolvedor de Soluções Digitais",

  description:
    "Sites, sistemas, automações e experiências digitais para negócios, profissionais e projetos educacionais.",

  url: siteUrl,

  locale: "pt_BR",

  language: "pt-BR",

  keywords: [
    "Jefferson Lopes",
    "desenvolvedor web",
    "desenvolvedor full stack",
    "desenvolvimento de sites",
    "sistemas web",
    "automação",
    "aplicações web",
    "tecnologia educacional",
    "gamificação",
    "São Paulo",
  ],
};