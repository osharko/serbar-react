export function ClassCard({ name, time, type }) {
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

  const colors = getClassColor(type);

  return (
    <div
      className="p-3 md:p-4 rounded-lg"
      style={{
        backgroundColor: colors.bg,
        borderLeft: `4px solid ${colors.border}`,
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = 'translateX(5px)')
      }
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
    >
      <div className="flex justify-between items-center">
        <div>
          <h4
            className="font-bold text-base md:text-lg font-kungfu"
            style={{ color: colors.text }}
          >
            {name}
          </h4>
          <p
            className="text-xs md:text-sm font-semibold mt-1"
            style={{ color: colors.text, opacity: 0.8 }}
          >
            {time}
          </p>
        </div>
        {/* <div
          className="w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0"
          style={{ backgroundColor: colors.border }}
        ></div> */}
      </div>
    </div>
  );
}
