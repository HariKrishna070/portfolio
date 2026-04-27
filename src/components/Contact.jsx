import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// ─── EmailJS configuration ────────────────────────────────────────────────────
// Credentials are stored in .env.local (gitignored – never pushed to GitHub).
// Copy .env.example → .env.local and fill in your real values from emailjs.com
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const STATUS = { IDLE: 'idle', SENDING: 'sending', SUCCESS: 'success', ERROR: 'error' };

function Contact({ isActive }) {
  const formRef = useRef(null);
  const [status, setStatus] = useState(STATUS.IDLE);

  const isConfigured =
    !!EMAILJS_SERVICE_ID  && EMAILJS_SERVICE_ID  !== 'YOUR_SERVICE_ID' &&
    !!EMAILJS_TEMPLATE_ID && EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
    !!EMAILJS_PUBLIC_KEY  && EMAILJS_PUBLIC_KEY  !== 'YOUR_PUBLIC_KEY';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConfigured) {
      alert('Please configure your EmailJS credentials in Contact.jsx first.');
      return;
    }
    setStatus(STATUS.SENDING);
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setStatus(STATUS.SUCCESS);
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus(STATUS.ERROR);
    }
  };

  // Auto-clear success / error after 5 s
  if (status === STATUS.SUCCESS || status === STATUS.ERROR) {
    setTimeout(() => setStatus(STATUS.IDLE), 5000);
  }

  return (
    <article className={`contact${isActive ? ' active' : ''}`} data-page="contact">
      <header>
        <h2 className="h2 article-title">Contact</h2>
      </header>

      {/* Contact Form */}
      <section className="contact-form">
        <h3 className="h3 form-title">Contact Form</h3>

        {/* Setup notice — shown only until EmailJS is configured */}
        {!isConfigured && (
          <div style={{
            background: 'hsla(45,100%,72%,0.12)',
            border: '1px solid hsl(45,100%,72%)',
            borderRadius: '12px',
            padding: '14px 18px',
            marginBottom: '20px',
            color: 'hsl(45,100%,72%)',
            fontSize: '13px',
            lineHeight: '1.6',
          }}>
            <strong>⚙️ Setup required:</strong> Open <code>src/components/Contact.jsx</code> and
            replace the three <code>YOUR_*</code> placeholders with your&nbsp;
            <a href="https://www.emailjs.com/" target="_blank" rel="noreferrer"
               style={{ color: 'inherit', textDecoration: 'underline' }}>
              EmailJS
            </a> credentials (free account). The form will work immediately after.
          </div>
        )}

        <form ref={formRef} onSubmit={handleSubmit} className="form" data-form>
          <div className="input-wrapper">
            <input
              type="text"
              name="from_name"
              className="form-input"
              placeholder="Full name"
              required
              data-form-input
            />
            <input
              type="email"
              name="from_email"
              className="form-input"
              placeholder="Email address"
              required
              data-form-input
            />
          </div>

          <textarea
            name="message"
            className="form-input"
            placeholder="Your Message"
            required
            data-form-input
          ></textarea>

          {/* Status messages */}
          {status === STATUS.SUCCESS && (
            <div style={{
              color: 'hsl(120,60%,60%)',
              fontSize: '14px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <ion-icon name="checkmark-circle-outline"></ion-icon>
              Message sent successfully! I will get back to you soon.
            </div>
          )}
          {status === STATUS.ERROR && (
            <div style={{
              color: 'hsl(0,70%,65%)',
              fontSize: '14px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <ion-icon name="alert-circle-outline"></ion-icon>
              Something went wrong. Please try again or email me directly.
            </div>
          )}

          <button
            className="form-btn"
            type="submit"
            disabled={status === STATUS.SENDING}
            data-form-btn
          >
            {status === STATUS.SENDING ? (
              <>
                <ion-icon name="sync-outline"></ion-icon>
                <span>Sending…</span>
              </>
            ) : (
              <>
                <ion-icon name="paper-plane"></ion-icon>
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </section>
    </article>
  );
}

export default Contact;
