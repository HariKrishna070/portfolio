import { useState } from 'react';

const EXPERIENCES = [
  {
    id: 'experience0',
    title: 'Specialist Programmer – Infosys',
    period: 'October 2025 – Present',
    description:
      'Working as a Specialist Programmer at Infosys, focusing on specialized software development, building scalable applications, and contributing to enterprise-grade AI/ML and software engineering solutions.',
    images: [],
  },
  {
    id: 'experience1',
    title: 'AgenticAI Engineer – AgentAnalytics.Ai (T-Hub, Hyderabad)',
    period: 'July 2024 – September 2025 · 1 yr 3 months',
    description:
      "Collaborated with the CEO & CTO to design and implement cutting-edge agentic AI systems and architectures enabling autonomous task execution and multi-agent coordination.\nDeployed and fine-tuned Large Language Models (LLMs) on AWS SageMaker and EC2, optimising inference pipelines for scalability and cost-effectiveness.\nEnhanced Waveflow-Studio — a production-grade SDK integrating LLMs, vector databases, and orchestration engines for enterprise AI workflows.\nBuilt Agentic AI POCs for clients and transitioned prototype ML systems into production-ready applications with robust AWS infrastructure.",
    images: [],
  },
  {
    id: 'experience3',
    title: 'AIML Virtual Internship – APSCHE-EduSkills',
    period: 'September 2023 – November 2023',
    description:
      "Tackled various ML challenges on Amazon SageMaker, mastering skills to solve real-time problems effectively and delivering practical solutions using advanced machine learning techniques and methodologies.",
    images: ['/assets/images/Machine Learning-1.png', '/assets/images/AI_ML-1.png'],
  },
  {
    id: 'experience4',
    title: 'Data Analytics Virtual Internship – AICTE',
    period: 'May 2023 – July 2023',
    description:
      "Gained proficiency in analyzing and visualizing data, extracting meaningful insights from real-time datasets. Developed the ability to interpret data effectively, empowering informed decision-making based on derived insights.",
    images: ['/assets/images/data analytics.png', '/assets/images/data analytics main.png'],
  },
  {
    id: 'experience5',
    title: 'Machine Learning Virtual Intern – Barath Intern',
    period: 'May 2023 – June 2023',
    description:
      "Used ML skills to develop predictive models for housing prices based on house features, and classification models for the iris flower dataset, classifying flowers based on their leaf characteristics.",
    images: ['/assets/images/barath intern.png'],
  },
];

function Experience({ isActive }) {
  const [popup, setPopup] = useState(null); // { images: [] }

  const handleOpen = (exp) => {
    if (exp.images.length > 0) setPopup(exp);
  };

  const handleClose = (e) => {
    if (e.target === e.currentTarget) setPopup(null);
  };

  return (
    <article className="contact" data-page="experinece" style={{ display: isActive ? 'block' : 'none' }}>
      <header>
        <h2 className="h2 article-title">Experinece</h2>
      </header>

      <section>
        <ul className="experience">
          {EXPERIENCES.map((exp) => (
            <li
              key={exp.id}
              id={exp.id}
              className="experience-item popup-link"
              onClick={() => handleOpen(exp)}
              style={{ cursor: exp.images.length > 0 ? 'pointer' : 'default' }}
            >
              <div className="experience-content-box">
                <div style={{ display: 'flex' }}>
                  <ion-icon style={{ height: '25px', width: '25px' }} name="arrow-forward-circle-outline"></ion-icon>
                  <h4 className="h4 experience-item-title">&ensp;{exp.title}</h4>
                </div>
                <span>&emsp;&ensp;&ensp; {exp.period}</span>
                <br />
                <p className="about-text">&emsp;&emsp;&emsp; {exp.description}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Popup */}
        {popup && (
          <div
            id="popup"
            className="popup"
            style={{ display: 'flex', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999, justifyContent: 'center', alignItems: 'center' }}
            onClick={handleClose}
          >
            <div className="popup-content">
              {popup.images.map((src, idx) => (
                <img key={idx} className="pop-img" src={src} alt={`certificate-${idx + 1}`} />
              ))}
            </div>
          </div>
        )}
      </section>
    </article>
  );
}

export default Experience;
