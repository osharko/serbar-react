export function Classes() {
  return (
    <section
      id="classes"
      className="py-12 md:py-20"
      style={{ backgroundColor: 'var(--color-background-alt)' }}
    >
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-kungfu"
          style={{ color: 'var(--color-brand-primary)' }}
        >
          I nostri corsi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--color-white)',
              boxShadow: '0 10px 15px -3px var(--color-shadow)',
            }}
          >
            <h3
              className="text-xl md:text-2xl font-bold mb-4 text-center"
              style={{ color: 'var(--color-brand-primary)' }}
            >
              Kung Fu - Qi Xing Tang Lang Quan
            </h3>
            <p
              className="text-sm md:text-base"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Kung-fu per adulti e bambini, Qi xin tang lang quan, la mantide
              religiosa 7 stelle, educazione fisica, mentale e spirituale!
            </p>
          </div>
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--color-white)',
              boxShadow: '0 10px 15px -3px var(--color-shadow)',
            }}
          >
            <h3
              className="text-xl md:text-2xl font-bold mb-4 text-center"
              style={{ color: 'var(--color-brand-primary)' }}
            >
              Taijiquan - Stile Yang
            </h3>
            <p
              className="text-sm md:text-base"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Il Taiji quan, la vetta, l’arte millenaria per affrontare lo
              stress della vita moderna con armonia, equilibrio e
              consapevolezza!
            </p>
          </div>
          <div
            className="p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--color-white)',
              boxShadow: '0 10px 15px -3px var(--color-shadow)',
            }}
          >
            <h3
              className="text-xl md:text-2xl font-bold mb-4 text-center"
              style={{ color: 'var(--color-brand-primary)' }}
            >
              Difesa Personale - M.P.F.
            </h3>
            <p
              className="text-sm md:text-base"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              M.P.F., la difesa personale specifica per uomini e donne.
              Presenza, disciplina, costanza, insita naturalmente nell’uomo.
              Basta risvegliare il fuoco dentro te!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
