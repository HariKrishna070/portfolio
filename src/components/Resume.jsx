const EDUCATION = [
  {
    title: 'Vishnu institute of technology, Bhimavaram',
    period: '2021 - 2025',
    text: 'studying BTech in field of Computer science (Artificial Intelligence and Data Science).\nCGPA : 8.9 (upto 5th sem)',
  },
  {
    title: 'Narayana junior college, Vijaywada',
    period: '2019 - 2021',
    text: 'Completed my intermediate (MPC) with total marks of 950 out of 1000.',
  },
  {
    title: 'Bethesda high school, Nuzvid',
    period: '2018 - 2019',
    text: 'Completed my high school with a CGPA of 9.8 out of 10',
  },
];

const ACHIEVEMENTS = [
  {
    title: 'Smart India Hackathon (SIH)',
    period: 'Sep, 2023',
    text: 'I spearheaded a team of six members in the Smart India Hackathon at the national level, where we successfully tackled a significant challenge. Our solution involved the development of an online integrated platform designed to streamline project management for students across diverse universities and colleges.',
  },
  {
    title: 'Kavach Hackathon',
    period: 'April, 2023',
    text: 'At the Kavach Hackathon, I assumed leadership of a six-member team tasked with the development of sophisticated models for both number plate detection and face recognition.',
  },
];

const SKILLS_BAR = [
  { name: 'Python', value: 98 },
  { name: 'DataBases', value: 90 },
  { name: 'Tableau & Excel', value: 95 },
  { name: 'Data Analysis', value: 95 },
  { name: 'Web scraping', value: 90 },
  { name: 'Machine Learning', value: 92 },
];

function downloadResume() {
  const anchor = document.createElement('a');
  anchor.href = '/assets/resume/HARI KRISHNA RESUME.pdf';
  anchor.download = 'HARI KRISHNA RESUME';
  anchor.click();
}

function Resume({ isActive }) {
  return (
    <article className={`resume${isActive ? ' active' : ''}`} data-page="resume">
      <header>
        <h2 className="h2 article-title">Resume</h2>
      </header>

      <section>
        <button onClick={downloadResume} className="form-btn" type="button">
          <ion-icon name="download"></ion-icon>
          <span>DOWNLOAD RESUME</span>
        </button>
      </section>

      {/* Education */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h3 className="h3">Education</h3>
        </div>
        <ol className="timeline-list">
          {EDUCATION.map((edu) => (
            <li key={edu.title} className="timeline-item">
              <h4 className="h4 timeline-item-title">{edu.title}</h4>
              <span>{edu.period}</span>
              <p className="timeline-text">{edu.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Participations & Achievements */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <ion-icon name="book-outline"></ion-icon>
          </div>
          <h3 className="h3">Participations and Achievements</h3>
        </div>
        <ol className="timeline-list">
          {ACHIEVEMENTS.map((ach) => (
            <li key={ach.title} className="timeline-item">
              <h4 className="h4 timeline-item-title">{ach.title}</h4>
              <span>{ach.period}</span>
              <p className="timeline-text">{ach.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section className="skill">
        <h3 className="h3 skills-title">My skills</h3>
        <ul className="skills-list content-card">
          {SKILLS_BAR.map((skill) => (
            <li key={skill.name} className="skills-item">
              <div className="title-wrapper">
                <h5 className="h5">{skill.name}</h5>
                <data value={skill.value}>{skill.value}%</data>
              </div>
              <div className="skill-progress-bg">
                <div className="skill-progress-fill" style={{ width: `${skill.value}%` }}></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

export default Resume;
