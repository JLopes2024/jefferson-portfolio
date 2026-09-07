export type ProjectCategory =
  | "clientes"
  | "sistemas"
  | "educacao";

export type Project = {
  slug: string;
  number: string;
  title: string;
  type: string;
  description: string;
  tags: string[];
  image?: string;
  featured: boolean;
  category: ProjectCategory;

  challenge?: string;
  solution?: string;
  technologies?: string[];
  demoUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "inclusivamente",
    number: "01",
    title: "InclusivaMente",
    type: "Website institucional",
    description:
      "Site desenvolvido para uma consultoria educacional, com foco em apresentar sua atuação, seus serviços e sua proposta de forma clara e profissional.",
    tags: [
      "Website",
      "Cliente real",
      "Educação",
      "Institucional",
    ],
    image: "/projects/inclusivamente.png",
    featured: true,
    category: "clientes",

    challenge:
      "Criar uma presença digital capaz de apresentar a atuação da consultoria de maneira clara, profissional e acessível para diferentes públicos.",

    solution:
      "Desenvolvimento de um website institucional organizado em torno da proposta da consultoria, seus serviços e projetos, priorizando clareza de navegação e comunicação.",

    technologies: [
      "Next.js",
      "TypeScript",
      "CSS",
    ],

    // demoUrl: "https://...",
    // githubUrl: "https://github.com/...",
  },

  {
    slug: "seguranca-web",
    number: "02",
    title: "Segurança Web",
    type: "Game educacional",
    description:
      "Experiência interativa criada para explorar conceitos relacionados à segurança digital por meio de gamificação.",
    tags: [
      "Game",
      "Educação",
      "Segurança",
      "Gamificação",
    ],
    image: "/projects/seguranca-web.png",
    featured: true,
    category: "educacao",
  },

  {
    slug: "automacao-excel",
    number: "03",
    title: "Automação Excel",
    type: "Sistema & automação",
    description:
      "Ferramenta criada para automatizar a leitura e o processamento de listas, reduzindo tarefas manuais e repetitivas.",
    tags: [
      "Automação",
      "Excel",
      "Dados",
      "Produtividade",
    ],
    image: "/projects/automacao-excel.png",
    featured: true,
    category: "sistemas",
  },

  {
    slug: "larissa-photographer",
    number: "04",
    title: "Larissa Photographer",
    type: "Website profissional",
    description:
      "Presença digital desenvolvida para apresentar um trabalho fotográfico de forma visual, profissional e acessível.",
    tags: [
      "Website",
      "Cliente real",
      "Fotografia",
      "Portfólio",
    ],
    image: "/projects/larissa-photographer.png",
    featured: true,
    category: "clientes",
  },

  {
    slug: "olympism-365",
    number: "05",
    title: "Olympism 365",
    type: "Aplicação educacional",
    description:
      "Projeto educacional voltado aos benefícios do esporte, utilizando tecnologia como parte da experiência de aprendizagem.",
    tags: [
      "Educação",
      "Esporte",
      "Aplicação web",
      "Interatividade",
    ],
    image: "/projects/olympism-365.png",
    featured: true,
    category: "educacao",
  },

  {
    slug: "varal-de-poemas",
    number: "06",
    title: "Varal de Poemas",
    type: "Projeto educacional",
    description:
      "Experiência digital criada para trabalhar produção, expressão e compartilhamento de poemas.",
    tags: [
      "Educação",
      "Literatura",
    ],
    featured: false,
    category: "educacao",
  },

  {
    slug: "linha-de-producao",
    number: "07",
    title: "Linha de Produção",
    type: "Aplicação educacional",
    description:
      "Aplicação voltada à compreensão de processos e organização de uma linha de produção.",
    tags: [
      "Simulação",
      "Processos",
      "Educação",
    ],
    featured: false,
    category: "sistemas",
  },

  {
    slug: "jogo-de-auditoria",
    number: "08",
    title: "Jogo de Auditoria",
    type: "Game educacional",
    description:
      "Experiência gamificada desenvolvida para trabalhar conceitos relacionados a auditoria.",
    tags: [
      "Game",
      "Gamificação",
      "Educação",
    ],
    featured: false,
    category: "educacao",
  },

  {
    slug: "bufunfa",
    number: "09",
    title: "Bufunfa",
    type: "Mini app financeiro",
    description:
      "Aplicação de banco criada para apoiar uma experiência educacional com jovens aprendizes.",
    tags: [
      "Finanças",
      "Educação",
      "Aplicação",
    ],
    featured: false,
    category: "educacao",
  },

  {
    slug: "jogo-da-velha",
    number: "10",
    title: "Jogo da Velha",
    type: "Mini game",
    description:
      "Jogo desenvolvido para utilização em atividades com células de uma comunidade católica.",
    tags: [
      "Game",
      "Interatividade",
    ],
    featured: false,
    category: "educacao",
  },
];

export const featuredProjects = projects.filter(
  (project) => project.featured
);

export const moreProjects = projects.filter(
  (project) => !project.featured
);