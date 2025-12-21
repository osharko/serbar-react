import { ClassCard } from './ClassCard';
import { DayScheduleProps } from '../../commons/Types';

export function DaySchedule({ day, classes }: DayScheduleProps) {
  return (
    <div
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
        {day}
      </h3>
      <div className="space-y-2 md:space-y-3">
        {classes.map((classItem, index) => (
          <ClassCard
            key={index}
            name={classItem.name}
            time={classItem.time}
            type={classItem.type}
          />
        ))}
      </div>
    </div>
  );
}
