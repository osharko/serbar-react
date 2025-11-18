import { useState } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false); // Chiudi il menu dopo il click
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Chi Siamo' },
    { id: 'classes', label: 'Corsi' },
    { id: 'schedule', label: 'Orari' },
    { id: 'contact', label: 'Contatti' }
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="shadow-lg fixed w-full z-50" style={{ backgroundColor: 'var(--color-brand-primary)', color: 'var(--color-white)' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Ser.Bar.</h1>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="transition hover:opacity-80"
                    style={{ color: 'var(--color-white)' }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--color-accent-gold)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--color-white)'}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile Burger Menu Button */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
              aria-expanded={isMenuOpen}
            >
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-white)',
                  transform: isMenuOpen ? 'rotate(45deg) translateY(8px)' : 'none'
                }}
              ></span>
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-white)',
                  opacity: isMenuOpen ? 0 : 1
                }}
              ></span>
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-white)',
                  transform: isMenuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none'
                }}
              ></span>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <ul className="pt-4 pb-2 space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-4 py-3 transition rounded"
                    style={{
                      color: 'var(--color-white)',
                      backgroundColor: isMenuOpen ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.color = 'var(--color-accent-gold)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.color = 'var(--color-white)';
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
