const NAV_ITEMS = [
  { label: 'About',          page: 'about'          },
  { label: 'Resume',         page: 'resume'         },
  { label: 'Experinece',     page: 'experinece'     },
  { label: 'Portfolio',      page: 'portfolio'      },
  { label: 'Certifications', page: 'certifications' },
];

function Navbar({ activePage, onNavigate }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {NAV_ITEMS.map(({ label, page }) => (
          <li key={page} className="navbar-item">
            <button
              className={`navbar-link${activePage === page ? ' active' : ''}`}
              onClick={() => onNavigate(page)}
              data-nav-link
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
