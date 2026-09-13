import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const INITIAL_INTEGRITY = 70

const starter = {
  html: `<main class="terminal">
  <header class="terminal-header">
    <span>JL MAINFRAME // 1987</span>
    <span id="status">SYSTEM LOCKED</span>
  </header>

  <section class="terminal-screen">

    <h1>SYSTEM OFFLINE</h1>

    <p id="operator">
      OPERADOR DESCONHECIDO
    </p>

    <p>
      Boot sequence interrupted.
      Manual intervention required.
    </p>

    <div class="system-module">
      <strong>SECURITY GATE</strong>

      <button id="access-btn">
        REQUEST ACCESS
      </button>
    </div>

    <div
      class="system-module reactor"
      id="reactor"
    >
      <strong>REACTOR CORE</strong>

      <p>STATUS: UNSTABLE</p>

      <button id="reactor-btn">
        STABILIZE
      </button>
    </div>

    <button id="final-override">
      FINAL OVERRIDE
    </button>

  </section>
</main>`,

  css: `body {
  margin: 0;
  min-height: 100vh;

  display: grid;
  place-items: center;

  padding: 24px;

  background: #020503;
  color: #d8e0d9;

  font-family:
    "Courier New",
    monospace;
}

.terminal {
  width: min(720px, 100%);

  border: 2px solid #334035;

  background: #081009;
}

.terminal-header {
  display: flex;
  justify-content: space-between;
  gap: 24px;

  padding: 12px 16px;

  border-bottom:
    1px solid #334035;

  color: #8b9a8d;

  font-size: 12px;
}

.terminal-screen {
  padding: 32px;
}

h1 {
  margin-top: 0;

  font-size: 52px;
}

/*
  NODE 03

  Troque apenas
  a cor abaixo.
*/
#operator {
  color: #777777;
}

.system-module {
  margin-top: 24px;
  padding: 18px;

  border: 1px solid #334035;
}

button {
  margin-top: 12px;

  padding: 10px 16px;

  border: 1px solid #5c6b5f;

  background: transparent;
  color: inherit;

  font: inherit;

  cursor: pointer;
}

.reactor.stable {
  border-color: #b8ff2c;

  box-shadow:
    0 0 24px
    rgba(184, 255, 44, 0.3);
}

.reactor.stable p {
  color: #b8ff2c;
}

#final-override {
  width: 100%;

  margin-top: 24px;
}`,

  js: `const accessButton =
  document.querySelector('#access-btn')

const reactorButton =
  document.querySelector('#reactor-btn')

const reactor =
  document.querySelector('#reactor')

const finalOverride =
  document.querySelector('#final-override')

const statusDisplay =
  document.querySelector('#status')


// NODE 04
// Troque apenas ACCESS DENIED.

accessButton.addEventListener(
  'click',
  () => {
    accessButton.textContent =
      'ACCESS DENIED'
  }
)


// NODE 05
// Troque apenas offline.

reactorButton.addEventListener(
  'click',
  () => {
    reactor.classList.add(
      'offline'
    )
  }
)


// NODE 06
// Troque apenas SYSTEM LOCKED.

finalOverride.addEventListener(
  'click',
  () => {
    statusDisplay.textContent =
      'SYSTEM LOCKED'
  }
)
`,
}

const missions = [
  {
    id: 'boot',

    node: 'NODE 01',

    name: 'BOOT SEQUENCE',

    focus: 'html',

    title:
      'Ligue o computador.',

    briefing:
      'O mainframe está desligado. Vamos começar com uma alteração bem simples no HTML.',

    objective:
      'Procure SYSTEM OFFLINE e troque por JL-01 ONLINE.',

    hint:
      'Procure <h1>SYSTEM OFFLINE</h1>. Não precisa mexer nas tags. Troque somente o texto.',

    reward: 100,

    file: {
      name: 'BOOT.LOG',

      content:
        'MAINFRAME INICIADO.\n\nO núcleo JL-01 respondeu ao comando.\n\nPrimeiro sistema restaurado.',
    },
  },

  {
    id: 'identity',

    node: 'NODE 02',

    name: 'IDENTITY NODE',

    focus: 'html',

    title:
      'Identifique o operador.',

    briefing:
      'O computador está ligado, mas ainda não reconhece quem está tentando acessar o sistema.',

    objective:
      'Procure OPERADOR DESCONHECIDO e troque por OPERADOR AUTORIZADO.',

    hint:
      'Procure <p id="operator">. Troque somente o texto que está dentro dele.',

    reward: 100,

    file: {
      name: 'IDENTITY.DAT',

      content:
        'OPERADOR RECONHECIDO.\n\nAUTORIZAÇÃO ACEITA.\n\nNível de acesso: TEMPORÁRIO.',
    },
  },

  {
    id: 'visual',

    node: 'NODE 03',

    name: 'VISUAL MATRIX',

    focus: 'css',

    title:
      'Ative a cor do sistema.',

    briefing:
      'Agora vamos alterar a aparência do terminal usando CSS. Você só precisa trocar uma cor.',

    objective:
      'Procure #operator no CSS e troque #777777 por #b8ff2c.',

    hint:
      'Você não precisa criar CSS novo. Localize color: #777777; e substitua a cor por #b8ff2c.',

    reward: 100,

    file: {
      name: 'DISPLAY.SYS',

      content:
        'CANAL VISUAL RESTAURADO.\n\nCOR DE SEGURANÇA ATIVA:\n#B8FF2C',
    },
  },

  {
    id: 'security',

    node: 'NODE 04',

    name: 'SECURITY GATE',

    focus: 'js',

    title:
      'Libere o acesso.',

    briefing:
      'Chegamos ao JavaScript. Toda a programação já está pronta. Você só precisa mudar o resultado.',

    objective:
      'Procure ACCESS DENIED no JavaScript e troque por ACCESS GRANTED.',

    hint:
      "Procure 'ACCESS DENIED'. Não mexa no addEventListener. Troque somente o texto entre aspas.",

    reward: 100,

    file: {
      name: 'GATE.KEY',

      content:
        'SECURITY GATE OPEN.\n\nACCESS GRANTED.\n\nPróximo sistema disponível: REACTOR CORE.',
    },
  },

  {
    id: 'reactor',

    node: 'NODE 05',

    name: 'REACTOR CONTROL',

    focus: 'js',

    title:
      'Estabilize o reator.',

    briefing:
      'Existe uma aparência especial chamada stable. Precisamos pedir ao JavaScript para ativá-la.',

    objective:
      "Procure reactor.classList.add('offline') e troque offline por stable.",

    hint:
      "A linha deve terminar assim: reactor.classList.add('stable')",

    reward: 100,

    file: {
      name: 'REACTOR.LOG',

      content:
        'REACTOR CORE STABLE.\n\nENERGIA NORMALIZADA.\n\nMAINFRAME: 95% RESTAURADO.',
    },
  },

  {
    id: 'override',

    node: 'NODE 06',

    name: 'FINAL OVERRIDE',

    focus: 'js',

    title:
      'Recupere o mainframe.',

    briefing:
      'Você chegou ao último nó. Toda a lógica já funciona. Falta apenas mudar a mensagem final.',

    objective:
      'Procure SYSTEM LOCKED no JavaScript e troque por SYSTEM RESTORED.',

    hint:
      "Procure statusDisplay.textContent. Troque somente 'SYSTEM LOCKED' por 'SYSTEM RESTORED'.",

    reward: 100,

    file: {
      name: 'MESSAGE_1987.TXT',

      content:
        'SYSTEM RESTORED.\n\nMISSION COMPLETE.\n\nVocê acabou de modificar HTML, CSS e JavaScript.\n\nO mainframe nunca precisava de um especialista.\nPrecisava de alguém disposto a experimentar.\n\n// END OF LINE // 1987',
    },
  },
]

function buildValidationScript(
  missionId,
  token,
) {
  if (!missionId || !token) {
    return ''
  }

  return `
<script>
(() => {
  const missionId =
    ${JSON.stringify(missionId)}

  const token =
    ${JSON.stringify(token)}

  function send(
    passed,
    detail = ''
  ) {
    window.parent.postMessage(
      {
        type:
          'MAINFRAME_VALIDATION',

        missionId,
        token,
        passed,
        detail,
      },
      '*'
    )
  }

  setTimeout(() => {
    try {
      let passed = false

      switch (missionId) {

        case 'boot': {
          const title =
            document.querySelector(
              'h1'
            )

          passed =
            title?.textContent
              .trim()
              .toUpperCase() ===
            'JL-01 ONLINE'

          break
        }

        case 'identity': {
          const operator =
            document.querySelector(
              '#operator'
            )

          passed =
            operator?.textContent
              .trim()
              .toUpperCase() ===
            'OPERADOR AUTORIZADO'

          break
        }

        case 'visual': {
          const operator =
            document.querySelector(
              '#operator'
            )

          if (!operator) {
            passed = false
            break
          }

          const color =
            getComputedStyle(
              operator
            ).color

          passed =
            /184\\s*,\\s*255\\s*,\\s*44/.test(
              color
            )

          break
        }

        case 'security': {
          const button =
            document.querySelector(
              '#access-btn'
            )

          if (!button) {
            passed = false
            break
          }

          button.click()

          passed =
            button.textContent
              .trim()
              .toUpperCase() ===
            'ACCESS GRANTED'

          break
        }

        case 'reactor': {
          const button =
            document.querySelector(
              '#reactor-btn'
            )

          const reactor =
            document.querySelector(
              '#reactor'
            )

          if (
            !button ||
            !reactor
          ) {
            passed = false
            break
          }

          button.click()

          passed =
            reactor.classList.contains(
              'stable'
            )

          break
        }

        case 'override': {
          const button =
            document.querySelector(
              '#final-override'
            )

          const status =
            document.querySelector(
              '#status'
            )

          if (
            !button ||
            !status
          ) {
            passed = false
            break
          }

          button.click()

          passed =
            status.textContent
              .trim()
              .toUpperCase() ===
            'SYSTEM RESTORED'

          break
        }

        default: {
          passed = false
        }
      }

      send(passed)
    } catch (error) {
      send(
        false,
        error?.message ||
          'Execution failure'
      )
    }
  }, 180)
})()
<\/script>`
}

function buildDocument(
  code,
  missionId = '',
  token = '',
) {
  const safeCss =
    code.css.replace(
      /<\/style/gi,
      '<\\/style',
    )

  const safeJs =
    code.js.replace(
      /<\/script/gi,
      '<\\/script',
    )

  const validation =
    buildValidationScript(
      missionId,
      token,
    )

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>
    JL Mainframe
  </title>

  <style>
${safeCss}
  </style>
</head>

<body>

${code.html}

<script>
${safeJs}
<\/script>

${validation}

</body>
</html>`
}

export default function CodeLab() {
  const iframeRef =
    useRef(null)

  const runTokenRef =
    useRef('')

  const resolvedTokenRef =
    useRef('')

  const [
    gameState,
    setGameState,
  ] = useState('intro')

  const [
    code,
    setCode,
  ] = useState(starter)

  const [
    runtimeCode,
    setRuntimeCode,
  ] = useState(starter)

  const [
    missionIndex,
    setMissionIndex,
  ] = useState(0)

  const [
    activeEditor,
    setActiveEditor,
  ] = useState(
    missions[0].focus,
  )

  const [
    integrity,
    setIntegrity,
  ] = useState(
    INITIAL_INTEGRITY,
  )

  const [
    score,
    setScore,
  ] = useState(0)

  const [
    feedback,
    setFeedback,
  ] = useState(null)

  const [
    missionSolved,
    setMissionSolved,
  ] = useState(false)

  const [
    showHint,
    setShowHint,
  ] = useState(false)

  const [
    unlockedFiles,
    setUnlockedFiles,
  ] = useState([])

  const [
    openFileName,
    setOpenFileName,
  ] = useState('')

  const [
    runToken,
    setRunToken,
  ] = useState('')

  const [
    previewKey,
    setPreviewKey,
  ] = useState(0)

  const mission =
    missions[missionIndex]

  const openFile =
    unlockedFiles.find(
      (file) =>
        file.name ===
        openFileName,
    )

  const document =
    useMemo(
      () =>
        buildDocument(
          runtimeCode,
          mission?.id,
          runToken,
        ),
      [
        runtimeCode,
        mission?.id,
        runToken,
      ],
    )

  useEffect(() => {
    function handleMessage(
      event,
    ) {
      if (
        event.source !==
        iframeRef.current
          ?.contentWindow
      ) {
        return
      }

      const data =
        event.data

      if (
        !data ||
        data.type !==
          'MAINFRAME_VALIDATION'
      ) {
        return
      }

      if (
        data.token !==
          runTokenRef.current ||
        resolvedTokenRef.current ===
          data.token
      ) {
        return
      }

      if (
        data.missionId !==
        mission.id
      ) {
        return
      }

      resolvedTokenRef.current =
        data.token

      if (data.passed) {
        setMissionSolved(true)

        setScore(
          (current) =>
            current +
            mission.reward,
        )

        setIntegrity(
          (current) =>
            Math.min(
              100,
              current + 5,
            ),
        )

        setUnlockedFiles(
          (current) => {
            const alreadyUnlocked =
              current.some(
                (file) =>
                  file.name ===
                  mission.file.name,
              )

            if (
              alreadyUnlocked
            ) {
              return current
            }

            return [
              ...current,
              mission.file,
            ]
          },
        )

        setOpenFileName(
          mission.file.name,
        )

        setFeedback({
          type: 'success',

          text:
            `${mission.node} RESTAURADO // +${mission.reward} SCORE`,
        })

        return
      }

      setFeedback({
        type: 'error',

        text:
          'AINDA NÃO // Confira a instrução e tente novamente. Você pode executar quantas vezes quiser.',
      })
    }

    window.addEventListener(
      'message',
      handleMessage,
    )

    return () =>
      window.removeEventListener(
        'message',
        handleMessage,
      )
  }, [
    mission.id,
    mission.file,
    mission.node,
    mission.reward,
  ])

  function startGame() {
    setCode(starter)

    setRuntimeCode(starter)

    setMissionIndex(0)

    setActiveEditor(
      missions[0].focus,
    )

    setIntegrity(
      INITIAL_INTEGRITY,
    )

    setScore(0)

    setFeedback(null)

    setMissionSolved(false)

    setShowHint(false)

    setUnlockedFiles([])

    setOpenFileName('')

    setRunToken('')

    runTokenRef.current = ''

    resolvedTokenRef.current =
      ''

    setGameState(
      'playing',
    )
  }

  function updateCode(value) {
    setCode(
      (current) => ({
        ...current,

        [activeEditor]:
          value,
      }),
    )
  }

  function runProgram() {
    if (
      missionSolved ||
      gameState !== 'playing'
    ) {
      return
    }

    const token =
      `${mission.id}-${Date.now()}-${Math.random()
        .toString(16)
        .slice(2)}`

    runTokenRef.current =
      token

    resolvedTokenRef.current =
      ''

    setFeedback({
      type: 'info',

      text:
        'EXECUTANDO DIAGNÓSTICO...',
    })

    setRuntimeCode({
      ...code,
    })

    setRunToken(token)

    setPreviewKey(
      (current) =>
        current + 1,
    )
  }

  function nextMission() {
    if (!missionSolved) {
      return
    }

    if (
      missionIndex ===
      missions.length - 1
    ) {
      setGameState(
        'complete',
      )

      return
    }

    const nextIndex =
      missionIndex + 1

    setMissionIndex(
      nextIndex,
    )

    setActiveEditor(
      missions[
        nextIndex
      ].focus,
    )

    setMissionSolved(false)

    setShowHint(false)

    setFeedback({
      type: 'info',

      text:
        `${missions[nextIndex].node} DESBLOQUEADO`,
    })

    setRunToken('')

    runTokenRef.current = ''

    resolvedTokenRef.current =
      ''

    setRuntimeCode({
      ...code,
    })
  }

  function useHint() {
    setShowHint(true)
  }

  function handleEditorKeyDown(
    event,
  ) {
    if (
      (
        event.ctrlKey ||
        event.metaKey
      ) &&
      event.key === 'Enter'
    ) {
      event.preventDefault()

      runProgram()
    }
  }

  function downloadProject() {
    const finalDocument =
      buildDocument(code)

    const blob =
      new Blob(
        [finalDocument],
        {
          type:
            'text/html;charset=utf-8',
        },
      )

    const url =
      URL.createObjectURL(
        blob,
      )

    const link =
      window.document.createElement(
        'a',
      )

    link.href = url

    link.download =
      'jl-mainframe-restored.html'

    link.click()

    URL.revokeObjectURL(
      url,
    )
  }

  if (
    gameState === 'intro'
  ) {
    return (
      <section
        className="section mainframe-game"
        id="code-lab"
      >
        <div className="mainframe-shell mainframe-intro">

          <div className="mf-system-line">
            INTERACTIVE SYSTEM
            // PORTFOLIO MODULE
          </div>

          <div className="mf-intro-content">

            <p className="mf-kicker">
              JL SYSTEMS PRESENTS
            </p>

            <h2>
              CTRL+ALT+
              <span>
                1987
              </span>
            </h2>

            <h3>
              INVASÃO AO
              MAINFRAME
            </h3>

            <div className="mf-story">

              <p>
                13 SET 1987 //
                23:47
              </p>

              <p>
                Um sistema
                desconhecido assumiu
                o controle do
                MAINFRAME JL-01.
              </p>

              <p>
                Você não precisa saber
                programar.
                Observe as instruções,
                faça pequenas
                alterações e recupere
                o sistema.
              </p>

            </div>

            <div className="mf-intro-stats">

              <span>
                06 NODES
              </span>

              <span>
                SEM LIMITE DE TEMPO
              </span>

              <span>
                HTML / CSS / JS
              </span>

            </div>

            <button
              type="button"
              className="mf-primary-button"
              onClick={startGame}
            >
              &gt; CONECTAR AO
              SISTEMA
            </button>

            <small>
              Erros não possuem
              penalidade. Experimente
              quantas vezes quiser.
            </small>

          </div>

        </div>
      </section>
    )
  }

  if (
    gameState === 'complete'
  ) {
    return (
      <section
        className="section mainframe-game"
        id="code-lab"
      >
        <div className="mainframe-shell mf-end-screen">

          <p className="mf-success">
            ALL NODES ONLINE
          </p>

          <h2>
            SYSTEM
            <span>
              {' '}RESTORED
            </span>
          </h2>

          <p>
            Você retomou o
            controle do JL-01
            e recuperou todos
            os arquivos do
            sistema.
          </p>

          <div className="mf-final-stats">

            <div>
              <span>
                SCORE
              </span>

              <strong>
                {score}
              </strong>
            </div>

            <div>
              <span>
                INTEGRITY
              </span>

              <strong>
                {integrity}%
              </strong>
            </div>

            <div>
              <span>
                NODES
              </span>

              <strong>
                06/06
              </strong>
            </div>

          </div>

          <div className="mf-final-files">

            {unlockedFiles.map(
              (file) => (
                <article
                  key={
                    file.name
                  }
                >
                  <strong>
                    {file.name}
                  </strong>

                  <pre>
                    {
                      file.content
                    }
                  </pre>
                </article>
              ),
            )}

          </div>

          <div className="mf-end-actions">

            <button
              type="button"
              className="mf-primary-button"
              onClick={
                downloadProject
              }
            >
              BAIXAR SISTEMA ↓
            </button>

            <button
              type="button"
              className="mf-secondary-button"
              onClick={
                startGame
              }
            >
              JOGAR NOVAMENTE
            </button>

          </div>

        </div>
      </section>
    )
  }

  return (
    <section
      className="section mainframe-game"
      id="code-lab"
    >
      <div className="mainframe-shell">

        <header className="mf-hud">

          <div>

            <span className="mf-status-light" />

            <strong>
              JL MAINFRAME //
              1987
            </strong>

          </div>

          <div className="mf-hud-data">

            <span>
              NODE{' '}
              <strong>
                {String(
                  missionIndex + 1,
                ).padStart(
                  2,
                  '0',
                )}
                /06
              </strong>
            </span>

            <span>
              SCORE{' '}
              <strong>
                {score}
              </strong>
            </span>

            <span>
              INT{' '}
              <strong>
                {integrity}%
              </strong>
            </span>

          </div>

        </header>

        <div className="mf-integrity">

          <div
            style={{
              width:
                `${integrity}%`,
            }}
          />

        </div>

        <div className="mf-nodes">

          {missions.map(
            (
              item,
              index,
            ) => {
              let stateClass =
                'is-locked'

              if (
                index <
                missionIndex
              ) {
                stateClass =
                  'is-complete'
              }

              if (
                index ===
                missionIndex
              ) {
                stateClass =
                  missionSolved
                    ? 'is-complete'
                    : 'is-active'
              }

              return (
                <div
                  key={item.id}
                  className={
                    `mf-node ${stateClass}`
                  }
                >

                  <span>
                    {String(
                      index + 1,
                    ).padStart(
                      2,
                      '0',
                    )}
                  </span>

                  <small>
                    {item.name}
                  </small>

                </div>
              )
            },
          )}

        </div>

        <div className="mf-game-grid">

          <aside className="mf-mission-panel">

            <div className="mf-mission-code">
              {mission.node}
            </div>

            <h2>
              {mission.name}
            </h2>

            <p className="mf-briefing">
              {mission.briefing}
            </p>

            <div className="mf-objective">

              <span>
                OBJECTIVE
              </span>

              <p>
                {mission.objective}
              </p>

            </div>

            <button
              type="button"
              className="mf-hint-button"
              onClick={useHint}
            >
              ? PRECISO DE UMA DICA
            </button>

            {showHint && (
              <div className="mf-hint">
                {mission.hint}
              </div>
            )}

            <div className="mf-files">

              <div className="mf-files-heading">

                <span>
                  RECOVERED FILES
                </span>

                <strong>
                  {
                    unlockedFiles.length
                  }
                  /6
                </strong>

              </div>

              {unlockedFiles.length ===
              0 ? (
                <small>
                  NO FILES FOUND
                </small>
              ) : (
                unlockedFiles.map(
                  (file) => (
                    <button
                      key={
                        file.name
                      }
                      type="button"
                      onClick={() =>
                        setOpenFileName(
                          file.name,
                        )
                      }
                    >
                      &gt;{' '}
                      {
                        file.name
                      }
                    </button>
                  ),
                )
              )}

              {openFile && (
                <pre className="mf-file-content">
                  {
                    openFile.content
                  }
                </pre>
              )}

            </div>

          </aside>

          <div className="mf-workspace">

            <div className="mf-editor-panel">

              <div className="mf-panel-bar">

                <span>
                  CODE TERMINAL
                </span>

                <span>
                  CTRL+ENTER = RUN
                </span>

              </div>

              <div className="mf-editor-tabs">

                {[
                  'html',
                  'css',
                  'js',
                ].map(
                  (
                    editor,
                  ) => (
                    <button
                      key={
                        editor
                      }
                      type="button"
                      className={
                        activeEditor ===
                        editor
                          ? 'active'
                          : ''
                      }
                      onClick={() =>
                        setActiveEditor(
                          editor,
                        )
                      }
                    >
                      {editor.toUpperCase()}
                    </button>
                  ),
                )}

              </div>

              <textarea
                aria-label={
                  `Editor de ${activeEditor}`
                }
                spellCheck="false"
                value={
                  code[
                    activeEditor
                  ]
                }
                onChange={(
                  event,
                ) =>
                  updateCode(
                    event
                      .target
                      .value,
                  )
                }
                onKeyDown={
                  handleEditorKeyDown
                }
              />

              <div className="mf-actions">

                <button
                  type="button"
                  className="mf-primary-button"
                  onClick={
                    runProgram
                  }
                  disabled={
                    missionSolved
                  }
                >
                  {missionSolved
                    ? 'NODE ONLINE ✓'
                    : 'RUN PROGRAM ▶'}
                </button>

                {missionSolved && (
                  <button
                    type="button"
                    className="mf-secondary-button"
                    onClick={
                      nextMission
                    }
                  >
                    {missionIndex ===
                    missions.length -
                      1
                      ? 'FINALIZAR →'
                      : 'PRÓXIMO NODE →'}
                  </button>
                )}

              </div>

            </div>

            <div className="mf-preview-panel">

              <div className="mf-panel-bar">

                <span>
                  CRT MONITOR
                </span>

                <span>
                  LIVE OUTPUT
                </span>

              </div>

              <iframe
                ref={
                  iframeRef
                }
                key={
                  previewKey
                }
                title="Mainframe output"
                sandbox="allow-scripts"
                srcDoc={
                  document
                }
              />

            </div>

            {feedback && (
              <div
                className={
                  `mf-feedback ${feedback.type}`
                }
                aria-live="polite"
              >
                {
                  feedback.text
                }
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  )
}