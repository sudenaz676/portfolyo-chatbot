import ChatWidget from "./ChatWidget";
import profile from "@/data/profile.json";

const accents = ["var(--accent-1)", "var(--accent-2)", "var(--accent-3)"];

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <h1>{profile.name}</h1>
        <p className="role">{profile.title}</p>
        <p className="summary">{profile.summary}</p>
      </section>

      <section>
        <h2>Eğitim</h2>
        <div className="exp-card" style={{ borderLeftColor: "var(--accent-1)" }}>
          <div className="exp-header">
            <h3>{profile.education.degree}</h3>
            <span className="period">{profile.education.period}</span>
          </div>
          <div className="org">{profile.education.school}</div>
        </div>
      </section>

      <section>
        <h2>İş Deneyimi</h2>
        {profile.experience.map((exp, i) => (
          <div key={exp.role} className="exp-card" style={{ borderLeftColor: accents[i % accents.length] }}>
            <div className="exp-header">
              <h3>{exp.role}</h3>
              <span className="period">{exp.period}</span>
            </div>
            <div className="org">{exp.org}</div>
            <ul>
              {exp.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Teknik Beceriler</h2>
        <div className="skills">
          {profile.skills.map((skill, i) => (
            <span key={skill} className="skill-tag" style={{ borderColor: accents[i % accents.length] }}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2>Yetkinlikler</h2>
        <div className="skills">
          {profile.softSkills.map((skill, i) => (
            <span key={skill} className="skill-tag" style={{ borderColor: accents[i % accents.length] }}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2>Diller</h2>
        <div className="lang-row">
          {profile.languages.map((lang) => (
            <div key={lang.name} className="lang-item">
              {lang.name}
              <span>{lang.level}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Projeler</h2>
        <div className="project-grid">
          {profile.projects.map((project, i) => (
            <div key={project.name} className="project-card" style={{ borderTopColor: accents[i % accents.length] }}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <a href={project.link} target="_blank">
                Projeyi gör →
              </a>
            </div>
          ))}
        </div>
      </section>

           <section>
        <h2>İletişim</h2>
        <div className="info-row">
          <a className="contact-link" href={profile.contact.github} target="_blank">GitHub</a>
          <a className="contact-link" href={profile.contact.linkedln} target="_blank">LinkedIn</a>
          <a className="contact-link" href={`mailto:${profile.contact.email}`}>{profile.contact.email}</a>
          <a className="contact-link" href={`tel:${profile.contact.phone}`}>{profile.contact.phone}</a>
        </div>
      </section>
      <ChatWidget />
    </main>
  );
}