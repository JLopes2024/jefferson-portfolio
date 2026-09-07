# Jefferson Lopes — Portfolio

Portfolio profissional de **Jefferson Lopes**, desenvolvido para apresentar projetos, serviços e experiências na interseção entre **desenvolvimento web, sistemas, automação e tecnologia educacional**.

> Transformo ideias em soluções digitais.

O projeto foi pensado para atender diferentes públicos: clientes, empresas, oportunidades profissionais e pessoas interessadas em projetos educacionais e interativos.

---

## Sobre o projeto

Este portfolio não funciona apenas como uma vitrine de tecnologias.

A proposta é apresentar problemas reais, soluções desenvolvidas e diferentes formas de utilizar tecnologia em contextos como:

- Sites e presença digital
- Sistemas web
- Automações
- Ferramentas internas
- Aplicações educacionais
- Games e gamificação
- Experiências digitais interativas

A identidade visual utiliza uma abordagem **dark, tecnológica e cinética**, com projetos como protagonistas e uso de animações para reforçar navegação e hierarquia visual.

---

## Tecnologias

O projeto utiliza uma stack simples e focada em performance, manutenção e facilidade de deploy.

### Front-end

- Next.js
- React
- TypeScript
- CSS Modules
- Motion
- Lucide React
- Next Image
- Next Font

### Infraestrutura

- Git
- GitHub
- Netlify
- Netlify Forms

---

## Principais funcionalidades

- Home responsiva
- Menu fullscreen
- Navegação com animações
- Seção de projetos em destaque
- Catálogo completo de projetos
- Filtros por categoria
- Rotas dinâmicas para cada projeto
- Cases individuais
- Navegação entre projeto anterior e próximo
- Links para demonstrações e repositórios quando disponíveis
- Seção de serviços
- Apresentação profissional
- Stack tecnológica
- Conversão por WhatsApp
- Formulário de contato
- Honeypot anti-spam
- Sitemap automático
- Robots.txt
- Metadata por página
- SEO individual para projetos
- Open Graph
- Twitter Cards
- Suporte a `prefers-reduced-motion`

---

## Categorias de projetos

Os projetos estão organizados em três grupos principais:

### Clientes

Projetos desenvolvidos para clientes reais e presença profissional.

Exemplos:

- InclusivaMente
- Larissa Photographer

### Sistemas & Automação

Aplicações voltadas à resolução de processos e tarefas.

Exemplos:

- Automação Excel
- Linha de Produção

### Educação & Games

Aplicações, jogos e experiências digitais utilizadas em contextos educacionais.

Exemplos:

- Segurança Web
- Olympism 365
- Varal de Poemas
- Jogo de Auditoria
- Bufunfa
- Jogo da Velha

---

## Estrutura principal

```text
src/
├── app/
│   ├── projetos/
│   │   ├── [slug]/
│   │   │   ├── page.tsx
│   │   │   └── ProjectPage.module.css
│   │   └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── components/
│   ├── contact/
│   ├── home/
│   ├── layout/
│   └── projects/
│
├── config/
│   └── site.ts
│
└── data/
    ├── contact.ts
    └── projects.ts

public/
├── projects/
└── __forms.html
```

---

## Executando localmente

### 1. Clone o repositório

```bash
git clone https://github.com/JLopes2024/jefferson-portfolio.git
```

### 2. Entre na pasta

```bash
cd jefferson-portfolio
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o ambiente de desenvolvimento

```bash
npm run dev
```

Abra:

```text
http://localhost:3000
```

---

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz quando precisar definir a URL oficial do site:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

No ambiente de produção, utilize a URL definitiva:

```env
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

Nenhuma chave privada, senha ou token deve ser adicionada diretamente ao código ou versionada no Git.

---

## Build de produção

Para validar o projeto antes do deploy:

```bash
npm run build
```

Depois:

```bash
npm run start
```

---

## Formulário de contato

O formulário foi preparado para utilizar **Netlify Forms**.

Ele possui:

- Validação nativa dos campos
- Estado de envio
- Feedback de sucesso
- Feedback de erro
- Campo honeypot contra spam
- Formulário HTML auxiliar para detecção durante o deploy

O recebimento efetivo das mensagens acontece após a publicação na Netlify.

---

## SEO

O projeto inclui:

- Metadata global
- Metadata individual dos projetos
- URLs canônicas
- Open Graph
- Twitter Cards
- Sitemap XML
- Robots.txt
- Títulos e descrições específicos

O sitemap pode ser acessado em:

```text
/sitemap.xml
```

E o robots:

```text
/robots.txt
```

---

## Responsividade e acessibilidade

O site foi desenvolvido considerando:

- Desktop
- Tablet
- Smartphones
- Navegação por teclado
- Estados de foco
- Semântica HTML
- `aria-label`
- Controle de foco no menu
- `prefers-reduced-motion`
- Contraste e legibilidade

---

## Deploy

O projeto está preparado para publicação na **Netlify**.

Fluxo previsto:

```text
GitHub
   ↓
Netlify
   ↓
Build Next.js
   ↓
Deploy
   ↓
Domínio
```

Após o deploy, a variável:

```env
NEXT_PUBLIC_SITE_URL
```

deve receber a URL oficial do portfolio.

---

## Desenvolvimento

Desenvolvido por **Jefferson Lopes**.

**Desenvolvedor de Soluções Digitais**

Sites, sistemas, automações e experiências digitais para negócios, profissionais e projetos educacionais.

### Contato

- GitHub: [JLopes2024](https://github.com/JLopes2024)
- LinkedIn: [Jefferson Lopes Silva](https://www.linkedin.com/in/jefferson-lopes-silva)
- E-mail: [jeffinho.je8@gmail.com](mailto:jeffinho.je8@gmail.com)

---

## Status

🚧 **Em desenvolvimento**

O portfolio está atualmente em fase de refinamento, conteúdo dos cases, otimizações finais e preparação para publicação.
