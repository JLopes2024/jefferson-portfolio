import { profile } from '../data/profile'

export default function About() {
  return (
    <section className="section about" id="about">
      <div>
        <p className="eyebrow">POR TRÁS DO CÓDIGO</p>
        <h2 className="about-title">
          Técnica
          <br />
          com
          <br />
          intenção.
        </h2>
      </div>

      <div className="about-content">
        <p className="about-copy">{profile.about}</p>

        <div className="skills-grid">
          {profile.skills.map((skill) => (
            <div className="skill-item" key={skill.label}>
              <span>{skill.label}</span>
              <strong>{skill.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
