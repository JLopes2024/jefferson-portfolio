import { useMemo, useState } from 'react'

const starter = {
  html: `<main class="card">
  <h1>Meu primeiro site</h1>
  <p>Eu fiz isso no navegador.</p>
  <button id="meu-botao">Clique em mim</button>
</main>`,
  css: `body {
  font-family: Arial, sans-serif;
  display: grid;
  min-height: 100vh;
  place-items: center;
  margin: 0;
}

.card {
  padding: 32px;
  border: 2px solid #111;
  border-radius: 20px;
}`,
  js: `const botao = document.querySelector('#meu-botao')

botao.addEventListener('click', () => {
  botao.textContent = 'Funcionou! 🚀'
})`,
}

const missions = [
  {
    key: 'html',
    label: '01 HTML',
    title: 'Troque o título pelo seu nome',
    help: 'Edite o texto dentro da tag <h1>.',
  },
  {
    key: 'css',
    label: '02 CSS',
    title: 'Dê uma cor para a página',
    help: 'Experimente background, color ou border.',
  },
  {
    key: 'js',
    label: '03 JavaScript',
    title: 'Faça o botão reagir',
    help: 'O exemplo já usa addEventListener. Mude a mensagem do clique.',
  },
]

function buildDocument(code) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu primeiro site</title>
  <style>${code.css}</style>
</head>
<body>
${code.html}
<script>
${code.js}
<\/script>
</body>
</html>`
}

export default function CodeLab() {
  const [code, setCode] = useState(starter)
  const [activeStep, setActiveStep] = useState(0)
  const [previewKey, setPreviewKey] = useState(0)

  const document = useMemo(() => buildDocument(code), [code])
  const mission = missions[activeStep]

  function updateCode(value) {
    setCode((current) => ({ ...current, [mission.key]: value }))
  }

  function runPreview() {
    setPreviewKey((value) => value + 1)
  }

  function nextMission() {
    setActiveStep((step) => Math.min(step + 1, missions.length - 1))
    runPreview()
  }

  function downloadProject() {
    const blob = new Blob([document], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = window.document.createElement('a')
    link.href = url
    link.download = 'meu-primeiro-site.html'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section className="section code-lab" id="code-lab">
      <div className="code-lab-heading">
        <div>
          <p className="eyebrow">EXPERIMENTE AGORA</p>
          <h2>Escreva seu primeiro código.</h2>
        </div>
        <p>
          Um mini laboratório direto no portfólio. Edite, execute e baixe o resultado como um
          arquivo HTML.
        </p>
      </div>

      <div className="mission-tabs" role="tablist" aria-label="Missões de código">
        {missions.map((item, index) => (
          <button
            className={index === activeStep ? 'mission-tab active' : 'mission-tab'}
            key={item.key}
            onClick={() => setActiveStep(index)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="lab-grid">
        <div className="editor-panel">
          <div className="panel-top">
            <div>
              <span>MISSÃO {String(activeStep + 1).padStart(2, '0')}</span>
              <strong>{mission.title}</strong>
            </div>
            <small>{mission.help}</small>
          </div>

          <textarea
            aria-label={`Editor de ${mission.key}`}
            spellCheck="false"
            value={code[mission.key]}
            onChange={(event) => updateCode(event.target.value)}
          />

          <div className="lab-actions">
            <button className="button button-primary" onClick={runPreview}>
              Executar ▶
            </button>

            {activeStep < missions.length - 1 ? (
              <button className="button button-secondary" onClick={nextMission}>
                Próxima missão →
              </button>
            ) : (
              <button className="button button-secondary" onClick={downloadProject}>
                Baixar meu site ↓
              </button>
            )}
          </div>
        </div>

        <div className="preview-panel">
          <div className="preview-label">RESULTADO</div>
          <iframe
            key={previewKey}
            title="Preview do código"
            sandbox="allow-scripts"
            srcDoc={document}
          />
        </div>
      </div>
    </section>
  )
}
