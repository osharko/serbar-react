export function Classes() {
  return (
    <section id="classes" className="py-12 md:py-20" style={{ backgroundColor: 'var(--color-background-alt)' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12" style={{ color: 'var(--color-brand-primary)' }}>
          I nostri corsi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-white)', boxShadow: '0 10px 15px -3px var(--color-shadow)' }}>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-center" style={{ color: 'var(--color-brand-primary)' }}>
              Kung Fu - Quxing Tang Lang Chuan
            </h3>
            <p className="text-sm md:text-base" style={{ color: 'var(--color-text-secondary)' }}>
              Kung Fu aperto a bambini (6-12) e adulti (13+). <br />
              Insegnamo lo stile delle Mantide Religiosa 7 Stelle, uno degli
              stili della mantide più diffusi nella Cina del Nord.
            </p>
          </div>
          <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-white)', boxShadow: '0 10px 15px -3px var(--color-shadow)' }}>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-center" style={{ color: 'var(--color-brand-primary)' }}>
              Taiji Chuan - Stile Yang
            </h3>
            <p className="text-sm md:text-base" style={{ color: 'var(--color-text-secondary)' }}>
              Il Taiji (o Tai-chi) è un arte marziale basata sulla ginnastica
              dolce. È adatto a tutte le età. <br />
              Lo stile adottato è lo stile Yang, quello più diffuso.
            </p>
          </div>
          <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--color-white)', boxShadow: '0 10px 15px -3px var(--color-shadow)' }}>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-center" style={{ color: 'var(--color-brand-primary)' }}>
              Difesa Personale - MPF
            </h3>
            <p className="text-sm md:text-base" style={{ color: 'var(--color-text-secondary)' }}>
              Il nostro corso di difesa personale è pensato per trasmettere le
              tecniche più efficaci del Kung Fu, e renderle accessibili in un
              tempo minore.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
