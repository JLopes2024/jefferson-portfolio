const mainStack = [
  { name: 'React', code: '⚛' },
  { name: 'JavaScript', code: 'JS' },
  { name: 'TypeScript', code: 'TS' },
  { name: 'Node.js', code: 'NODE' },
  { name: 'Supabase', code: 'SB' },
  { name: 'PostgreSQL', code: 'PG' },
  { name: 'HTML', code: 'HTML' },
  { name: 'CSS', code: 'CSS' },
  { name: 'REST APIs', code: 'API' },
]

const otherStack = [
  { name: 'Python', code: 'PY' },
  { name: 'Flask', code: 'FL' },
  { name: 'MySQL', code: 'SQL' },
  { name: 'SQL Server', code: 'DB' },
  { name: 'Git', code: 'GIT' },
  { name: 'GitHub', code: 'GH' },
]

function StackBadge({ item, secondary = false }) {
  return (
    <div className={`stack-badge ${secondary ? 'secondary' : ''}`}>
      <span className="stack-icon">{item.code}</span>
      <span>{item.name}</span>
    </div>
  )
}

export default function Stack() {
  return (
    <section className="section stack-section" id="stack">
      <div className="stack-heading">
        <div>
          <p className="eyebrow">TECNOLOGIAS</p>
          <h2>Stack que uso<br />para construir.</h2>
        </div>
        <p>
          Tecnologias que fazem parte do meu trabalho com landing pages,
          aplicações educacionais, APIs, bancos de dados e produtos digitais.
        </p>
      </div>

      <div className="stack-block">
        <span className="stack-label">STACK PRINCIPAL</span>
        <div className="stack-list">
          {mainStack.map((item) => <StackBadge key={item.name} item={item} />)}
        </div>
      </div>

      <div className="stack-block">
        <span className="stack-label">OUTRAS FERRAMENTAS</span>
        <div className="stack-list">
          {otherStack.map((item) => <StackBadge key={item.name} item={item} secondary />)}
        </div>
      </div>
    </section>
  )
}
