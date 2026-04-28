import { asset } from '../utils/asset';

function Sidebar({ isOpen, onToggle }) {
  return (
    <aside className={`sidebar${isOpen ? ' active' : ''}`} data-sidebar>

      <div className="sidebar-info">
        <figure className="avatar-box">
          <img id="avatar" src={asset('/assets/images/hari.jpg')} alt="HARI KRISHNA BEKKAM" width="80" />
        </figure>

        <div className="info-content">
          <h1 className="name" title="Hari Krishna Bekkam">HARI KRISHNA</h1>
          <p className="title">AIML Engineer || Data Scientist</p>
        </div>

        <button className="info_more-btn" onClick={onToggle} data-sidebar-btn>
          <span>Show Contacts</span>
          <ion-icon name="chevron-down"></ion-icon>
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          {/* Email */}
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="mail-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              {/* word-break so the long address wraps cleanly on all screens */}
              <a
                href="mailto:harikrishnabekkam1590852@gmail.com"
                className="contact-link"
                style={{ wordBreak: 'break-all' }}
              >
                harikrishnabekkam1590852@gmail.com
              </a>
            </div>
          </li>

          {/* Phone */}
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a href="tel:+918639669877" className="contact-link">+91 8639669877</a>
            </div>
          </li>

          {/* Birthday */}
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="calendar-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Birthday</p>
              <time dateTime="2003-04-24">April 24, 2003</time>
            </div>
          </li>

          {/* Location */}
          <li className="contact-item">
            <div className="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>
                D.No:1-5, near Ramalayam, Edara village, Agiripalli mandal,
                Eluru district, Andhra Pradesh, 521211.
              </address>
            </div>
          </li>
        </ul>

        <div className="separator"></div>

        {/* Social links */}
        <ul className="social-list" style={{ gap: '12px' }}>
          <li className="social-item">
            <a
              href="https://www.linkedin.com/in/hari-krishna-bekkam-02a630231/"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
          </li>
          <li className="social-item">
            <a
              href="https://github.com/HariKrishna070"
              target="_blank"
              rel="noreferrer"
              className="social-link"
            >
              <ion-icon name="logo-github"></ion-icon>
            </a>
          </li>
        </ul>
      </div>

      {/* Modal container */}
      <div className="modal-container" data-modal-container>
        <div className="overlay" data-overlay></div>
        <section className="testimonials-modal">
          <button className="modal-close-btn" data-modal-close-btn>
            <ion-icon name="close-outline"></ion-icon>
          </button>
          <div className="modal-img-wrapper">
            <figure className="modal-avatar-box">
              <img src={asset('/assets/images/my-avatar.png')} alt="" width="80" data-modal-img />
            </figure>
          </div>
          <div className="modal-content">
            <h4 className="h3 modal-title" data-modal-title></h4>
            <div data-modal-text></div>
          </div>
        </section>
      </div>

    </aside>
  );
}

export default Sidebar;
