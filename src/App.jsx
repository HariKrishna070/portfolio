import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import About from './components/About';
import Resume from './components/Resume';
import Experience from './components/Experience';
import Portfolio from './components/Portfolio';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import FloatingWidget from './components/FloatingWidget';

const PAGES = ['about', 'resume', 'experinece', 'portfolio', 'certifications'];

function App() {
  const [activePage, setActivePage] = useState('about');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <main>
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(prev => !prev)} />

        <div className="main-content">
          <Navbar activePage={activePage} onNavigate={(page) => { setActivePage(page); window.scrollTo(0, 0); }} />

          <About isActive={activePage === 'about'} />
          <Resume isActive={activePage === 'resume'} />
          <Experience isActive={activePage === 'experinece'} />
          <Portfolio isActive={activePage === 'portfolio'} />
          <Certifications isActive={activePage === 'certifications'} />
          <Contact isActive={activePage === 'contact'} />
        </div>
      </main>

      <FloatingWidget />
    </>
  );
}

export default App;
