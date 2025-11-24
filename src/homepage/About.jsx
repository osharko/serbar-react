export function About() {
  return (
    <section
      id="about"
      className="py-12 md:py-20"
      style={{ backgroundColor: 'var(--color-white)' }}
    >
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-kungfu"
          style={{ color: 'var(--color-brand-primary)' }}
        >
          Chi Siamo
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-base md:text-lg leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Benvenuti nella Ser.Bar. Kung Fu, dove le antiche tradizioni delle
            arti marziali incontrano metodi di allenamento moderni. Dove il
            legame maestro-allievo progredisce attraverse un percorso di
            crescita personale, fitness fisico e disciplina mentale.
          </p>
        </div>
      </div>
    </section>
  );
}
