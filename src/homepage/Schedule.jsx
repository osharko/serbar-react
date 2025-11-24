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
      kids: { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' },
      adults: { bg: '#DBEAFE', text: '#1E3A8A', border: '#3B82F6' },
      taiji: { bg: '#D1FAE5', text: '#065F46', border: '#10B981' },
      defense: { bg: '#FCE7F3', text: '#831843', border: '#EC4899' },
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
          Orari dei Corsi
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
              <div
                key={index}
                className="p-4 md:p-6 rounded-lg"
                style={{
                  backgroundColor: 'var(--color-background-light)',
                  border: '2px solid var(--color-background-alt)',
                  boxShadow: '0 4px 6px -1px var(--color-shadow)',
                }}
              >
                <h3
                  className="text-xl md:text-2xl font-bold mb-3 md:mb-4 pb-2"
                  style={{
                    color: 'var(--color-brand-primary)',
                    borderBottom: '2px solid var(--color-accent-gold)',
                  }}
                >
                  {daySchedule.day}
                </h3>
                <div className="space-y-2 md:space-y-3">
                  {daySchedule.classes.map((classItem, classIndex) => {
                    const colors = getClassColor(classItem.type);
                    return (
                      <div
                        key={classIndex}
                        className="p-3 md:p-4 rounded-lg"
                        style={{
                          backgroundColor: colors.bg,
                          borderLeft: `4px solid ${colors.border}`,
                          transition: 'transform 0.2s',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = 'translateX(5px)')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = 'translateX(0)')
                        }
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4
                              className="font-bold text-base md:text-lg"
                              style={{ color: colors.text }}
                            >
                              {classItem.name}
                            </h4>
                            <p
                              className="text-xs md:text-sm font-semibold mt-1"
                              style={{ color: colors.text, opacity: 0.8 }}
                            >
                              {classItem.time}
                            </p>
                          </div>
                          <div
                            className="w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: colors.border }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
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
