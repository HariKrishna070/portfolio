import { useState } from 'react';

const PROJECTS = [
  {
    title: 'Hostel Management Website',
    category: 'web development',
    img: '/assets/images/hostel.png',
    href: 'https://github.com/HariKrishna070/miniProject',
  },
  {
    title: 'Todo website',
    category: 'web development',
    img: '/assets/images/todo.png',
    href: 'https://github.com/HariKrishna070/Final-capston-project',
  },
  {
    title: 'Amazon Sales Data Analysis',
    category: 'data analysis',
    img: '/assets/images/amazon.png',
    href: 'https://github.com/HariKrishna070/EDA-on-Amazon-Sales-dataset-using-Python',
  },
  {
    title: 'Covid-19 India Data Analysis dashboard',
    category: 'tableau',
    img: '/assets/images/covid19Dashboard.png',
    href: 'https://public.tableau.com/app/profile/hari.krishna.bekkam/viz/Covid-19inIndiaDashboardAnalysis_17147136888470/Dashboard1?publish=yes',
  },
  {
    title: 'Customer Churn Analysis and Prediction',
    category: 'data analysis',
    img: '/assets/images/churn.jpg',
    href: 'https://github.com/HariKrishna070/Customer-Churn-and-Sentiment-analysis/blob/main/churn-analysis-in-e-commerce.ipynb',
  },
  {
    title: 'Sentiment Analysis',
    category: 'data analysis',
    img: '/assets/images/sentiment.jpg',
    href: 'https://github.com/HariKrishna070/Customer-Churn-and-Sentiment-analysis/blob/main/BA_Assignment_SentimentAnalysis.ipynb',
  },
  {
    title: 'World Cup Results Analysis 1930-2014',
    category: 'tableau',
    img: '/assets/images/World Cup Results 1930-2014.png',
    href: 'https://public.tableau.com/app/profile/hari.krishna.bekkam/viz/WorldCupResults1930-2014_17147142485360/Dashboard1?publish=yes',
  },
];

const FILTER_BUTTONS = ['All', 'Data Analysis', 'Tableau', 'Web development'];

function Portfolio({ isActive }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectLabel, setSelectLabel] = useState('Select category');

  const handleFilter = (val) => {
    setActiveFilter(val.toLowerCase());
    setSelectLabel(val);
    setSelectOpen(false);
  };

  const filtered = PROJECTS.filter((p) =>
    activeFilter === 'all' ? true : p.category === activeFilter
  );

  return (
    <article className={`portfolio${isActive ? ' active' : ''}`} data-page="portfolio">
      <header>
        <h2 className="h2 article-title">Portfolio</h2>
      </header>

      <section className="projects">
        {/* Desktop filter buttons */}
        <ul className="filter-list">
          {FILTER_BUTTONS.map((btn) => (
            <li key={btn} className="filter-item">
              <button
                className={activeFilter === btn.toLowerCase() ? 'active' : ''}
                onClick={() => handleFilter(btn)}
                data-filter-btn
              >
                {btn}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile filter select */}
        <div className="filter-select-box">
          <button
            className={`filter-select${selectOpen ? ' active' : ''}`}
            onClick={() => setSelectOpen((prev) => !prev)}
            data-select
          >
            <div className="select-value" data-selecct-value>{selectLabel}</div>
            <div className="select-icon">
              <ion-icon name="chevron-down"></ion-icon>
            </div>
          </button>

          <ul className={`select-list${selectOpen ? ' active' : ''}`} style={selectOpen ? { opacity: 1, visibility: 'visible', pointerEvents: 'all' } : {}}>
            {FILTER_BUTTONS.map((btn) => (
              <li key={btn} className="select-item">
                <button onClick={() => handleFilter(btn)} data-select-item>{btn}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Project grid */}
        <ul className="project-list">
          {PROJECTS.map((project) => {
            const visible =
              activeFilter === 'all' || project.category === activeFilter;
            return (
              <li
                key={project.title}
                className={`project-item${visible ? ' active' : ''}`}
                data-filter-item
                data-category={project.category}
              >
                <a href={project.href} target="_blank" rel="noreferrer">
                  <figure className="project-img">
                    <div className="project-item-icon-box">
                      <ion-icon name="eye-outline"></ion-icon>
                    </div>
                    <img
                      id="projects"
                      src={project.img}
                      alt={project.title}
                      loading="lazy"
                    />
                  </figure>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-category">{project.category}</p>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </article>
  );
}

export default Portfolio;
