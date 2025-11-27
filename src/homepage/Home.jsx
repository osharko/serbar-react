import { useEffect } from 'react';
import { Footer } from '../commons/Footer';
import { Navbar } from '../commons/Navbar';
import { About } from './About';
import { Classes } from './Classes';
import { Contact } from './Contact';
import { HomepageBanner } from './HomepageBanner';
import { Schedule } from './Schedule';

export function Homepage() {
  // Remove SEO fallback content when React mounts
  useEffect(() => {
    const root = document.getElementById('root');
    const seoContent = root?.querySelector('div[style*="left: -9999px"]');
    if (seoContent) {
      seoContent.remove();
    }
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-background-light)' }}
    >
      <Navbar />

      {/* Banner with Auto-scrolling Carousel */}
      <HomepageBanner />

      {/* About Section */}
      <About />

      {/* Classes Section */}
      <Classes />

      {/* Schedule Section */}
      <Schedule />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
}
