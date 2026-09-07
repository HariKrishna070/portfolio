import { useState } from 'react';

const EXPERIENCES = [
  {
    id: 'experience0',
    title: 'Specialist Programmer – Infosys',
    period: 'October 2025 – Present',
    points: [
      'Developing Agentic AI solutions to analyze legacy VB.NET applications, understand business logic and dependencies, and automate migration of legacy components into .NET Core and Java Spring Boot services.',
      'Developed automation scripts to analyze ASP.NET (.aspx) files, map legacy UI components to corresponding Angular components, and extract business and database logic, generating structured documentation and contextual knowledge to guide AI agents in accurate application migration.',
      'Designed AI-assisted migration workflows that leverage extracted application knowledge, business rules, UI mappings, and database dependencies to enable more accurate and context-aware legacy code transformation.',
    ],
    images: [],
  },
  {
    id: 'experience1',
    title: 'Agentic AI Engineer – AgentAnalytics.AI',
    period: 'July 2024 – September 2025',
    points: [
      'Architected and productionized multi-agent RAG applications for enterprise clients using LangChain, LangGraph, CrewAI, and AutoGen, with Langfuse for end-to-end tracing, evaluation, and observability of agent workflows.',
      'Designed and developed WaveFlow Studio, a proprietary enterprise Multi-Agent SDK enabling scalable agentic applications through agent orchestration, memory management, and MCP-based tool integration.',
      'Partnered directly with enterprise clients to understand business requirements, architect tailored multi-agent AI solutions using WaveFlow Studio, and drive solutions from technical design through successful client adoption.',
      'Engineered and deployed production-grade Multi-Agent RAG systems on AWS, leveraging SageMaker, EC2, ECR, and Docker for scalable model serving, containerized deployments, and reliable AI workloads.',
      'Led LLM inference optimization for CPU environments, benchmarking llama.cpp and vLLM and tuning model configurations and runtime parameters to achieve up to 300 tokens/sec while improving deployment efficiency.',
    ],
    images: [],
  },
  {
    id: 'experience3',
    title: 'AIML Virtual Internship – APSCHE-EduSkills',
    period: 'September 2023 – November 2023',
    points: [
      'Tackled various ML challenges on Amazon SageMaker, mastering skills to solve real-time problems effectively and delivering practical solutions using advanced machine learning techniques and methodologies.',
    ],
    images: ['/assets/images/Machine Learning-1.png', '/assets/images/AI_ML-1.png'],
  },
  {
    id: 'experience4',
    title: 'Data Analytics Virtual Internship – AICTE',
    period: 'May 2023 – July 2023',
    points: [
      'Gained proficiency in analyzing and visualizing data, extracting meaningful insights from real-time datasets. Developed the ability to interpret data effectively, empowering informed decision-making based on derived insights.',
    ],
    images: ['/assets/images/data analytics.png', '/assets/images/data analytics main.png'],
  },
  {
    id: 'experience5',
    title: 'Machine Learning Virtual Intern – Barath Intern',
    period: 'May 2023 – June 2023',
    points: [
      'Used ML skills to develop predictive models for housing prices based on house features, and classification models for the iris flower dataset, classifying flowers based on their leaf characteristics.',
    ],
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
        <h2 className="h2 article-title">Experience</h2>
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <ion-icon style={{ height: '22px', width: '22px', color: 'var(--orange-yellow-crayola)' }} name="arrow-forward-circle-outline"></ion-icon>
                  <h4 className="h4 experience-item-title" style={{ margin: '0 0 0 8px' }}>{exp.title}</h4>
                </div>
                <span style={{ display: 'inline-block', margin: '4px 0 10px 30px', color: 'var(--vegas-gold)', fontSize: '13px' }}>{exp.period}</span>
                <ul style={{ listStyleType: 'disc', paddingLeft: '32px', margin: 0 }}>
                  {exp.points.map((point, idx) => (
                    <li key={idx} className="about-text" style={{ marginBottom: '8px', lineHeight: '1.6', fontSize: '14px' }}>
                      {point}
                    </li>
                  ))}
                </ul>
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
