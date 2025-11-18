import bannerImage from '../assets/banner.webp';

export function HomepageBanner() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="pt-16">
      <div className="relative min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden">
        {/* Background Image - Responsive per foto verticale */}
        <div className="absolute inset-0">
          <img
            src={bannerImage}
            alt="Ser.Bar. Kung Fu San Benedetto del Tronto"
            className="w-full h-full object-cover object-center"
            style={{
              objectPosition: 'center center',
            }}
          />
          {/* Overlay gradient per leggibilità testo */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)',
            }}
          ></div>
        </div>

        {/* Banner Content */}
        <div className="relative h-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center px-4">
          <div
            className="text-center max-w-4xl mx-auto"
            style={{ color: 'var(--color-white)' }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 drop-shadow-lg">
              L'Arte del Kung Fu
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 drop-shadow-lg">
              Disciplina • Forza • Armonia
            </p>
            <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto drop-shadow-lg">
              Scopri le antiche arti marziali cinesi a San Benedetto del Tronto.
              <br />
              Corsi di Kung Fu, Taiji Chuan e Difesa Personale per tutte le età.
            </p>
            <button
              onClick={scrollToContact}
              className="px-6 md:px-8 py-3 md:py-4 rounded-lg text-lg md:text-xl font-semibold transition shadow-lg"
              style={{
                backgroundColor: 'var(--color-brand-primary)',
                color: 'var(--color-white)',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--color-brand-dark)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--color-brand-primary)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Inizia il Tuo Percorso
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
