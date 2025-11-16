export function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-red-900 text-white shadow-lg fixed w-full z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Kung Fu Academy</h1>
            <ul className="flex space-x-6">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="hover:text-yellow-400 transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-yellow-400 transition"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('classes')}
                  className="hover:text-yellow-400 transition"
                >
                  Classes
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('schedule')}
                  className="hover:text-yellow-400 transition"
                >
                  Schedule
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-yellow-400 transition"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
