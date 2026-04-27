import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

/* ─── EmailJS ────────────────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SEND_STATUS = { IDLE: 'idle', SENDING: 'sending', SUCCESS: 'success', ERROR: 'error' };

/* ─── Chatbot knowledge base ─────────────────────────────────────────────── */
const BOT_RESPONSES = [
  {
    keywords: ['hello', 'hi', 'hey', 'howdy', 'greet'],
    answer: "👋 Hi there! I'm Hari's portfolio assistant. Ask me anything about his skills, experience, projects, or education!",
  },
  {
    keywords: ['who', 'about', 'yourself', 'introduce', 'hari'],
    answer: "I'm **HARI KRISHNA BEKKAM** — a passionate Web Developer & Data Scientist from Andhra Pradesh, India. Currently working as a Specialist Programmer at **Infosys**. I love building AI/ML solutions and full-stack web apps! 🚀",
  },
  {
    keywords: ['skill', 'know', 'tech', 'technology', 'language', 'stack'],
    answer: "🛠️ My core skills include:\n• **AI/ML** — LLMs, RAG, Multi-Agent Systems, Generative AI\n• **Languages** — Python, Data Structures\n• **Databases** — MySQL, MongoDB, Google Firebase\n• **Data Analysis** — Pandas, NumPy, Matplotlib, Seaborn\n• **Visualization Tools** — Tableau, Excel\n• **Web Scraping** — BeautifulSoup, Selenium\n• **Machine Learning** — Supervised, Unsupervised, Feature Engineering\n• **Cloud** — AWS SageMaker",
  },
  {
    keywords: ['experience', 'work', 'job', 'company', 'intern', 'infosys', 'agent'],
    answer: "💼 My experience:\n1. **Specialist Programmer @ Infosys** (Oct 2025 – Present)\n2. **Machine Learning Engineer (Intern) @ AgentAnalytics.Ai** (Jul 2024 – Sep 2025 · 1 yr 3 months)\n3. **AIML Virtual Intern @ APSCHE-EduSkills** (Sep–Nov 2023)\n4. **Data Analytics Intern @ AICTE** (May–Jul 2023)\n5. **ML Intern @ Barath Intern** (May–Jun 2023)",
  },
  {
    keywords: ['education', 'college', 'university', 'study', 'degree', 'btech', 'vishnu'],
    answer: "🎓 Education:\n• **B.Tech in CS (AI & Data Science)** — Vishnu Institute of Technology, Bhimavaram (2021–2025), CGPA: 8.9\n• **Intermediate (MPC)** — Narayana Junior College, Vijayawada (2019–2021), 950/1000\n• **High School** — Bethesda High School, Nuzvid (2019), CGPA: 9.8",
  },
  {
    keywords: ['project', 'portfolio', 'build', 'created', 'made'],
    answer: "🚀 Notable projects:\n• **Hostel Management Website** — Full-stack web app\n• **Todo Website** — React-based task manager\n• **Amazon Sales Data Analysis** — Python EDA project\n• **Covid-19 India Dashboard** — Tableau visualization\n• **Customer Churn Analysis** — ML prediction model\n• **Sentiment Analysis** — NLP project\n• **World Cup Results 1930–2014** — Tableau dashboard",
  },
  {
    keywords: ['contact', 'email', 'reach', 'phone', 'connect', 'message'],
    answer: "📬 You can reach Hari at:\n• **Email:** harikrishnabekkam1590852@gmail.com\n• **Phone:** +91 8639669877\n• **LinkedIn:** linkedin.com/in/hari-krishna-bekkam-02a630231\n• **GitHub:** github.com/HariKrishna070\n\nOr use the **Contact** tab here to send a message directly! ✉️",
  },
  {
    keywords: ['linkedin', 'github', 'social', 'profile'],
    answer: "🔗 Find Hari online:\n• **LinkedIn:** [linkedin.com/in/hari-krishna-bekkam-02a630231](https://www.linkedin.com/in/hari-krishna-bekkam-02a630231/)\n• **GitHub:** [github.com/HariKrishna070](https://github.com/HariKrishna070)",
  },
  {
    keywords: ['resume', 'cv', 'download'],
    answer: "📄 You can download Hari's resume directly from the **Resume** tab on the portfolio! Click the yellow 'DOWNLOAD RESUME' button there.",
  },
  {
    keywords: ['certification', 'course', 'award', 'hackathon', 'sih'],
    answer: "🏆 Certifications & achievements:\n• Full Stack Web Dev (NodeJS) — Nov 2023\n• Introduction to RDBMS\n• Python for Data Science & AI\n• Tableau — Jan 2024\n• Cloud Computing\n• Blockchain\n• **Smart India Hackathon** finalist — Sep 2023\n• Kavach Hackathon leader — Apr 2023\n• Innovate India Coding Championship",
  },
  {
    keywords: ['python', 'ml', 'machine learning', 'ai', 'artificial', 'llm', 'generative'],
    answer: "🤖 Hari is deeply into AI/ML! He works with:\n• **LLMs** (Large Language Models) deployment on AWS SageMaker\n• **RAG** (Retrieval-Augmented Generation) pipelines\n• **Multi-Agent Systems** for enterprise GenAI\n• **Generative AI** fine-tuning and prompt engineering\n• Supervised & Unsupervised ML, Feature Engineering",
  },
  {
    keywords: ['birthday', 'born', 'age', 'old'],
    answer: "🎂 Hari was born on **April 24, 2003** — making him 22 years old and already making waves in AI & software development!",
  },
  {
    keywords: ['location', 'where', 'from', 'place', 'city'],
    answer: "📍 Hari is from **Edara village, Agiripalli mandal, Eluru district, Andhra Pradesh, India** — currently working at Infosys.",
  },
  {
    keywords: ['thank', 'thanks', 'great', 'awesome', 'cool', 'nice', 'good'],
    answer: "😊 You're welcome! Feel free to ask anything else about Hari's work, skills, or projects. I'm here to help!",
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later'],
    answer: "👋 Goodbye! Don't forget to connect with Hari on LinkedIn or GitHub. Have a great day! 🌟",
  },
];

function getBotResponse(input) {
  const lower = input.toLowerCase();
  for (const entry of BOT_RESPONSES) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.answer;
    }
  }
  return "🤔 I'm not sure about that! Try asking about Hari's **skills**, **experience**, **projects**, **education**, or **contact info**. Or switch to the Contact tab to send him a direct message! 📬";
}

/* ─── ChatMessage component ──────────────────────────────────────────────── */
function ChatMessage({ msg }) {
  const isBot = msg.role === 'bot';
  return (
    <div style={{
      display: 'flex',
      justifyContent: isBot ? 'flex-start' : 'flex-end',
      marginBottom: '12px',
      alignItems: 'flex-end',
      gap: '8px',
    }}>
      {isBot && (
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
          background: 'linear-gradient(135deg, hsl(45,100%,72%), hsl(35,100%,68%))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', flexShrink: 0,
        }}>🤖</div>
      )}
      <div style={{
        maxWidth: '78%',
        padding: '10px 13px',
        borderRadius: isBot ? '4px 14px 14px 14px' : '14px 14px 4px 14px',
        background: isBot
          ? 'hsl(240,2%,18%)'
          : 'linear-gradient(135deg, hsl(45,100%,72%), hsl(35,100%,68%))',
        color: isBot ? 'hsl(0,0%,90%)' : 'hsl(0,0%,10%)',
        fontSize: '13px',
        lineHeight: '1.55',
        whiteSpace: 'pre-wrap',
        boxShadow: '0 2px 8px hsla(0,0%,0%,0.2)',
      }}>
        {msg.text}
      </div>
    </div>
  );
}

/* ─── Main FloatingWidget component ─────────────────────────────────────── */
function FloatingWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('chat');   // 'chat' | 'contact'
  const [messages, setMessages] = useState([
    { role: 'bot', text: "👋 Hi! I'm Hari's portfolio assistant. Ask me about his skills, projects, experience, or anything else!" },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Contact form state
  const formRef = useRef(null);
  const [sendStatus, setSendStatus] = useState(SEND_STATUS.IDLE);
  const isEmailConfigured =
    !!EMAILJS_SERVICE_ID && EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' &&
    !!EMAILJS_TEMPLATE_ID && EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
    !!EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (e) => {
    e?.preventDefault();
    const text = inputVal.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInputVal('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: 'bot', text: getBotResponse(text) }]);
    }, 700 + Math.random() * 500);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailConfigured) return;
    setSendStatus(SEND_STATUS.SENDING);
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setSendStatus(SEND_STATUS.SUCCESS);
      formRef.current.reset();
      setTimeout(() => setSendStatus(SEND_STATUS.IDLE), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setSendStatus(SEND_STATUS.ERROR);
      setTimeout(() => setSendStatus(SEND_STATUS.IDLE), 5000);
    }
  };

  /* ── styles ── */
  const panelStyle = {
    position: 'fixed',
    bottom: '90px',
    right: '20px',
    width: '340px',
    maxHeight: '520px',
    background: 'hsl(240,2%,13%)',
    border: '1px solid hsl(0,0%,22%)',
    borderRadius: '20px',
    boxShadow: '0 24px 60px hsla(0,0%,0%,0.5)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 9999,
    animation: 'widgetSlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)',
  };

  return (
    <>
      {/* ── Panel ── */}
      {open && (
        <div className="floating-panel" style={panelStyle}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, hsl(240,2%,18%), hsl(240,2%,15%))',
            padding: '14px 16px 0',
            borderBottom: '1px solid hsl(0,0%,22%)',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, hsl(45,100%,72%), hsl(35,100%,68%))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
                }}>
                  {tab === 'chat' ? '🤖' : '✉️'}
                </div>
                <div>
                  <div style={{ color: 'hsl(0,0%,98%)', fontWeight: 600, fontSize: '14px' }}>
                    {tab === 'chat' ? "Hari's Assistant" : 'Send a Message'}
                  </div>
                  <div style={{ color: 'hsl(120,60%,65%)', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'hsl(120,60%,65%)', display: 'inline-block' }}></span>
                    Online
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={{
                background: 'hsl(240,2%,22%)', border: 'none', borderRadius: '8px',
                width: '28px', height: '28px', cursor: 'pointer', color: 'hsl(0,0%,70%)',
                fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>×</button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {['chat', 'contact'].map((t) => (
                <button key={t} onClick={() => setTab(t)} style={{
                  flex: 1, padding: '8px', border: 'none', borderRadius: '10px 10px 0 0',
                  cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                  background: tab === t ? 'hsl(240,2%,13%)' : 'transparent',
                  color: tab === t ? 'hsl(45,100%,72%)' : 'hsl(0,0%,60%)',
                  transition: 'all 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                }}>
                  {t === 'chat' ? '💬 Chat' : '✉️ Contact'}
                </button>
              ))}
            </div>
          </div>

          {/* ── Chat tab ── */}
          {tab === 'chat' && (
            <>
              <div style={{ flex: 1, overflowY: 'auto', padding: '16px', scrollbarWidth: 'thin' }}>
                {messages.map((msg, i) => <ChatMessage key={i} msg={msg} />)}
                {typing && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, hsl(45,100%,72%), hsl(35,100%,68%))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🤖</div>
                    <div style={{ display: 'flex', gap: '4px', padding: '10px 14px', background: 'hsl(240,2%,18%)', borderRadius: '4px 14px 14px 14px' }}>
                      {[0, 1, 2].map((i) => (
                        <span key={i} style={{
                          width: '6px', height: '6px', borderRadius: '50%',
                          background: 'hsl(45,100%,72%)',
                          animation: `typingDot 1s ${i * 0.2}s infinite`,
                          display: 'inline-block',
                        }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={sendMessage} style={{
                display: 'flex', gap: '8px', padding: '12px 14px',
                borderTop: '1px solid hsl(0,0%,22%)', background: 'hsl(240,2%,15%)', flexShrink: 0,
              }}>
                <input
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  placeholder="Ask me anything…"
                  style={{
                    flex: 1, background: 'hsl(240,2%,20%)', border: '1px solid hsl(0,0%,25%)',
                    borderRadius: '10px', padding: '9px 13px', color: 'hsl(0,0%,90%)',
                    fontSize: '13px', outline: 'none', fontFamily: 'inherit',
                  }}
                />
                <button type="submit" style={{
                  background: 'linear-gradient(135deg, hsl(45,100%,72%), hsl(35,100%,68%))',
                  border: 'none', borderRadius: '10px', padding: '9px 13px',
                  cursor: 'pointer', fontSize: '16px', flexShrink: 0,
                }}>➤</button>
              </form>
            </>
          )}

          {/* ── Contact tab ── */}
          {tab === 'contact' && (
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', scrollbarWidth: 'thin' }}>
              {!isEmailConfigured && (
                <div style={{
                  background: 'hsla(45,100%,72%,0.1)', border: '1px solid hsl(45,100%,72%)',
                  borderRadius: '10px', padding: '12px', marginBottom: '14px',
                  color: 'hsl(45,100%,72%)', fontSize: '12px', lineHeight: '1.5',
                }}>
                  ⚙️ Configure EmailJS in <code>.env.local</code> to enable this form.
                </div>
              )}

              <form ref={formRef} onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" name="from_name" placeholder="Your name" required style={{
                  background: 'hsl(240,2%,18%)', border: '1px solid hsl(0,0%,25%)',
                  borderRadius: '10px', padding: '10px 13px', color: 'hsl(0,0%,90%)',
                  fontSize: '13px', outline: 'none', fontFamily: 'inherit', width: '100%',
                }} />
                <input type="email" name="from_email" placeholder="Your email" required style={{
                  background: 'hsl(240,2%,18%)', border: '1px solid hsl(0,0%,25%)',
                  borderRadius: '10px', padding: '10px 13px', color: 'hsl(0,0%,90%)',
                  fontSize: '13px', outline: 'none', fontFamily: 'inherit', width: '100%',
                }} />
                <textarea name="message" placeholder="Your message…" required rows={4} style={{
                  background: 'hsl(240,2%,18%)', border: '1px solid hsl(0,0%,25%)',
                  borderRadius: '10px', padding: '10px 13px', color: 'hsl(0,0%,90%)',
                  fontSize: '13px', outline: 'none', fontFamily: 'inherit', resize: 'vertical', width: '100%',
                }} />

                {sendStatus === SEND_STATUS.SUCCESS && (
                  <div style={{ color: 'hsl(120,60%,60%)', fontSize: '13px', textAlign: 'center' }}>
                    ✅ Message sent! Hari will reply soon.
                  </div>
                )}
                {sendStatus === SEND_STATUS.ERROR && (
                  <div style={{ color: 'hsl(0,70%,65%)', fontSize: '13px', textAlign: 'center' }}>
                    ❌ Something went wrong. Please try again.
                  </div>
                )}

                <button type="submit" disabled={sendStatus === SEND_STATUS.SENDING} style={{
                  background: sendStatus === SEND_STATUS.SENDING
                    ? 'hsl(240,2%,25%)'
                    : 'linear-gradient(135deg, hsl(45,100%,72%), hsl(35,100%,68%))',
                  border: 'none', borderRadius: '10px', padding: '11px',
                  color: sendStatus === SEND_STATUS.SENDING ? 'hsl(0,0%,60%)' : 'hsl(0,0%,10%)',
                  fontWeight: 700, fontSize: '13px', cursor: sendStatus === SEND_STATUS.SENDING ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit', transition: 'all 0.2s',
                }}>
                  {sendStatus === SEND_STATUS.SENDING ? '⏳ Sending…' : '✉️ Send Message'}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* ── FAB Button ── */}
      <button
        className="floating-fab"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open chat or contact"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, hsl(45,100%,72%), hsl(35,100%,68%))',
          boxShadow: '0 8px 32px hsla(45,100%,50%,0.4)',
          zIndex: 10000,
          fontSize: '26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s',
          transform: open ? 'rotate(45deg) scale(0.95)' : 'rotate(0deg) scale(1)',
          animation: !open ? 'fabPulse 3s 2s infinite' : 'none',
        }}
      >
        {open ? '✕' : '💬'}
      </button>

      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes widgetSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes fabPulse {
          0%, 100% { box-shadow: 0 8px 32px hsla(45,100%,50%,0.4); }
          50%       { box-shadow: 0 8px 48px hsla(45,100%,50%,0.7); }
        }
        @keyframes typingDot {
          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }
          40%            { transform: scale(1.4); opacity: 1; }
        }

        /* ── Mobile: push FAB and panel above the fixed bottom navbar (~65px) ── */
        @media (max-width: 1023px) {
          .floating-fab {
            bottom: 80px !important;
            right: 16px !important;
            width: 52px !important;
            height: 52px !important;
            font-size: 22px !important;
          }
          .floating-panel {
            bottom: 142px !important;
            right: 16px !important;
            width: calc(100vw - 32px) !important;
            max-width: 380px !important;
            max-height: 60vh !important;
          }
        }
      `}</style>
    </>
  );
}

export default FloatingWidget;
