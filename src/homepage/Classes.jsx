import { ClassCard } from './schedule/ClassCard';

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
          I NOSTRI CORSI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <ClassCard
            key="1"
            name="Kung Fu - Qi Xing Tang Lang Quan"
            time="Kung-fu per adulti e bambini, Qi xin tang lang quan, la mantide
              religiosa 7 stelle, educazione fisica, mentale e spirituale!"
            type="adults"
          />
          <ClassCard
            key="1"
            name="Taijiquan - Stile Yang"
            time="Il Taiji quan, la vetta, l’arte millenaria per affrontare lo
              stress della vita moderna con armonia, equilibrio e
              consapevolezza!"
            type="taiji"
          />
          <ClassCard
            key="1"
            name="Difesa Personale - M.P.F."
            time="M.P.F., la difesa personale specifica per uomini e donne.
              Presenza, disciplina, costanza, insita naturalmente nell’uomo.
              Basta risvegliare il fuoco dentro te!"
            type="defense"
          />
        </div>
      </div>
    </section>
  );
}
