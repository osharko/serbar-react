import { useState, useEffect } from 'react';
import { DaySchedule } from './DaySchedule';
import {
  CoursesType,
  DayScheduleData,
  CourseMapping,
  ClassInfo,
  ClassInfoWithStartTime,
  ColorConfig,
} from '../../commons/Types';

export function Schedule() {
  const [scheduleData, setScheduleData] = useState<DayScheduleData[]>([]);

  // Mapping from CSV course names to display names and types
  const courseMap: Record<string, CourseMapping> = {
    taiji: { name: 'Taiji Chuan', type: 'taiji' as CoursesType },
    'kung-fu-adulti': { name: 'Kung Fu Adulti', type: 'adults' as CoursesType },
    'kung-fu-bimbi': { name: 'Kung Fu Bimbi', type: 'kids' as CoursesType },
    mpf: { name: 'Difesa Personale', type: 'defense' as CoursesType },
  };

  // Mapping from CSV day names to display names
  const dayMap: Record<string, string> = {
    lunedì: 'Lunedì',
    martedì: 'Martedì',
    mercoledì: 'Mercoledì',
    giovedì: 'Giovedì',
    venerdì: 'Venerdì',
    sabato: 'Sabato',
    domenica: 'Domenica',
  };

  function csvToJson(csv: string) {
    const lines = csv.trim().split('\n') ?? [];
    const headers = lines.shift()?.split(',') ?? [];
    return lines.map((line) => {
      const values = line.split(',');
      return headers.reduce(
        (obj: { [key: string]: any }, header: string, index) => {
          obj[header.replaceAll('"', '')] = values[index].replaceAll('"', '');
          return obj;
        },
        {}
      );
    });
  }

  useEffect(() => {
    fetch(
      'https://docs.google.com/spreadsheets/d/1Lhxlu8UOnTE6qmeTStmyLf6V8M78_6oulq9V8XUMvng/gviz/tq?tqx=out:csv&gid=0'
    )
      .then((res) => res.text())
      .then((csv) => {
        const json = csvToJson(csv);

        // Transform CSV data into scheduleData format
        const scheduleByDay: Record<
          string,
          { day: string; classes: ClassInfoWithStartTime[] }
        > = {};

        json.forEach((row) => {
          const corso = row.corso;
          const giorno = row.giorno;
          const oraInizio = row.ora_inizio;
          const oraFine = row.ora_fine;

          // Get mapped values
          const courseInfo = courseMap[corso];
          const dayName = dayMap[giorno.toLowerCase()];

          if (!courseInfo || !dayName) return; // Skip if mapping not found

          // Initialize day if it doesn't exist
          if (!scheduleByDay[dayName]) {
            scheduleByDay[dayName] = {
              day: dayName,
              classes: [],
            };
          }

          // Add class to the day
          scheduleByDay[dayName].classes.push({
            name: courseInfo.name,
            time: `${oraInizio} - ${oraFine}`,
            type: courseInfo.type,
            startTime: oraInizio, // Keep for sorting
          });
        });

        // Convert to array and sort by day order
        const dayOrder = [
          'Lunedì',
          'Martedì',
          'Mercoledì',
          'Giovedì',
          'Venerdì',
          'Sabato',
          'Domenica',
        ];
        const scheduleArray = dayOrder
          .map((day) => scheduleByDay[day])
          .filter((dayData) => Boolean(dayData))
          .map((dayData) => {
            // Sort classes by start time
            const sortedClasses = [...dayData.classes].sort((a, b) => {
              // Convert time string "HH:MM" to comparable number
              const timeA = a.startTime.replace(':', '').padStart(4, '0');
              const timeB = b.startTime.replace(':', '').padStart(4, '0');
              return timeA.localeCompare(timeB);
            });

            // Remove startTime property and convert to ClassInfo[]
            const classesWithoutStartTime: ClassInfo[] = sortedClasses.map(
              ({ startTime, ...cls }) => cls
            );

            return {
              day: dayData.day,
              classes: classesWithoutStartTime,
            } as DayScheduleData;
          });

        setScheduleData(scheduleArray);
      })
      .catch((error) => {
        console.error('Error fetching schedule:', error);
      });
  }, []);

  const getClassColor = (type: CoursesType): ColorConfig => {
    const colors: Record<CoursesType, ColorConfig> = {
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
                {
                  type: 'kids' as CoursesType,
                  label: 'Kung Fu Bimbi (6-12 anni)',
                },
                {
                  type: 'adults' as CoursesType,
                  label: 'Kung Fu Adulti (13+)',
                },
                { type: 'taiji' as CoursesType, label: 'Taiji Chuan' },
                { type: 'defense' as CoursesType, label: 'Difesa Personale' },
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
