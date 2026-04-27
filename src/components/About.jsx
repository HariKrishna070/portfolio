const SKILLS = [
  { label: 'Programming Languages', items: ['Python', 'Data Structures'] },
  { label: 'Artificial Intelligence', items: ['LLMs (Large Language Models)', 'RAG (Retrieval-Augmented Generation)', 'Multi-Agent Systems', 'Generative AI'] },
  { label: 'Databases', items: ['Mysql/sql', 'MongoDB', 'Google Firebase'] },
  { label: 'Data Analysis using Python', items: ['Numpy', 'Pandas', 'Matplotlib', 'Seaborn'] },
  { label: 'Data Analysis & Visualization Tools', items: ['Excel', 'Tableau'] },
  { label: 'Web Scraping using Python', items: ['BeautifulSoup', 'Selenium'] },
  { label: 'Machine Learning', items: ['Supervised Learning', 'Unsupervised Learning', 'Feature Engineering'] },
];

function About({ isActive }) {
  return (
    <article className={`about${isActive ? ' active' : ''}`} data-page="about">
      <header>
        <h2 className="h2 article-title">About me</h2>
      </header>

      <section className="about-text">
        <p>I&apos;m HARI KRISHNA BEKKAM,</p>
        <p>
          &emsp;&emsp;&emsp;my career objective is to attain valuable knowledge and professional skills to complement
          statistics in an actual job environment and keen to contribute to a cause. I am a young, energetic, and
          geekly individual who desire to learn is endless.
        </p>
      </section>

      {/* What I Know */}
      <section className="service">
        <h3 className="h3 service-title">What I Know</h3>

        <ul className="service-list">
          {SKILLS.map((skill) => (
            <li key={skill.label} className="service-item">
              <div className="service-content-box">
                <h4 className="h4 service-item-title">{skill.label}</h4>
                <ul className="star-list">
                  {skill.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Modal container (kept for compatibility) */}
      <div className="modal-container" data-modal-container>
        <div className="overlay" data-overlay></div>
        <section className="testimonials-modal">
          <button className="modal-close-btn" data-modal-close-btn>
            <ion-icon name="close-outline"></ion-icon>
          </button>
          <div className="modal-img-wrapper">
            <figure className="modal-avatar-box">
              <img src="/assets/images/my-avatar.png" alt="" width="80" data-modal-img />
            </figure>
          </div>
          <div className="modal-content">
            <h4 className="h3 modal-title" data-modal-title></h4>
            <div data-modal-text></div>
          </div>
        </section>
      </div>
    </article>
  );
}

export default About;
