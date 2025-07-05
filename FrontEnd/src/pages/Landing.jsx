import Home from '../components/Home';
import Menu from '../components/Menu';
import About from '../components/About';
import Contact from '../components/Contact';
import { useEffect } from 'react';

function Landing() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div>
      <Home />
      <Menu />
      <About />
      <Contact />
    </div>
  );
}

export default Landing;