import { DaySchedule } from './DaySchedule';

export function Schedule() {
  const scheduleData = [
    {
      day: 'Martedì',
      classes: [
        { name: 'Kung Fu Bimbi', time: '17:00 - 18:00', type: 'kids' },
        { name: 'Kung Fu Adulti', time: '18:30 - 20:00', type: 'adults' },
        { name: 'Taiji Chuan', time: '18:30 - 20:00', type: 'taiji' },
      ],
    },
    {
      day: 'Mercoledì',
      classes: [
        { name: 'Difesa Personale', time: '18:30 - 20:00', type: 'defense' },
      ],
    },
    {
      day: 'Venerdì',
      classes: [
        { name: 'Kung Fu Bimbi', time: '17:00 - 18:00', type: 'kids' },
        { name: 'Kung Fu Adulti', time: '18:30 - 20:00', type: 'adults' },
      ],
    },
    {
      day: 'Sabato',
      classes: [{ name: 'Taiji Chuan', time: '08:00 - 09:00', type: 'taiji' }],
    },
  ];

  const getClassColor = (type) => {
    const colors = {
      kids: {
        bg: 'var(--color-class-kids-bg)',
        text: 'var(--color-class-kids-text)',
        border: 'var(--color-class-kids-border)',
      },
      adults: {
        bg: 'var(--color-class-adults-bg)',
        text: 'var(--color-class-adults-text)',
        border: 'var(--color-class-adults-border)',
      },
      taiji: {
        bg: 'var(--color-class-taiji-bg)',
        text: 'var(--color-class-taiji-text)',
        border: 'var(--color-class-taiji-border)',
      },
      defense: {
        bg: 'var(--color-class-defense-bg)',
        text: 'var(--color-class-defense-text)',
        border: 'var(--color-class-defense-border)',
      },
    };
    return colors[type];
  };

  return (
    <section
      id="schedule"
      className="py-12 md:py-20"
      style={{ backgroundColor: 'var(--color-white)' }}
    >
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4 font-kungfu"
          style={{ color: 'var(--color-brand-primary)' }}
        >
          ORARI DEI CORSI
        </h2>
        <p
          className="text-center mb-8 md:mb-12 text-sm md:text-base"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Consulta il nostro programma settimanale
        </p>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {scheduleData.map((daySchedule, index) => (
              <DaySchedule
                key={index}
                day={daySchedule.day}
                classes={daySchedule.classes}
              />
            ))}
          </div>

          {/* Legenda */}
          <div
            className="mt-6 md:mt-8 p-4 md:p-6 rounded-lg"
            style={{ backgroundColor: 'var(--color-background-alt)' }}
          >
            <h4
              className="font-bold mb-3 text-center text-sm md:text-base"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Legenda Corsi
            </h4>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {[
                { type: 'kids', label: 'Kung Fu Bimbi (6-12 anni)' },
                { type: 'adults', label: 'Kung Fu Adulti (13+)' },
                { type: 'taiji', label: 'Taiji Chuan' },
                { type: 'defense', label: 'Difesa Personale' },
              ].map((item) => {
                const colors = getClassColor(item.type);
                return (
                  <div key={item.type} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 md:w-4 md:h-4 rounded flex-shrink-0"
                      style={{ backgroundColor: colors.border }}
                    ></div>
                    <span
                      style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: '0.75rem',
                      }}
                      className="md:text-sm"
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
