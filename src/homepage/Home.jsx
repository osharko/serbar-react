import { Footer } from '../commons/Footer';
import { Navbar } from '../commons/Navbar';
import { About } from './About';
import { Classes } from './Classes';
import { Contact } from './Contact';
import { HomepageBanner } from './HomepageBanner';
import { Schedule } from './Schedule';

export function Homepage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
