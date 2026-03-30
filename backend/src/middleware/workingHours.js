export const enforceWorkingHours = (options = {}) => {
  const startHour = options.startHour ?? 8;
  const endHour = options.endHour ?? 17;
  const allowedWeekdays = options.allowedWeekdays ?? [1, 2, 3, 4, 5];
  const timeZone = options.timeZone ?? process.env.ORG_TIMEZONE;

  const getZonedParts = () => {
    const now = new Date();
    if (!timeZone) {
      return { day: now.getDay(), hour: now.getHours() };
    }

    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
      hour: "2-digit",
      hour12: false,
    });

    const parts = dtf.formatToParts(now);
    const weekday = parts.find((p) => p.type === "weekday")?.value;
    const hourStr = parts.find((p) => p.type === "hour")?.value;

    const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      day: dayMap[weekday] ?? now.getDay(),
      hour: Number(hourStr ?? now.getHours()),
    };
  };

  return (req, res, next) => {
    const { day, hour } = getZonedParts();
    const isWeekdayAllowed = allowedWeekdays.includes(day);
    const isWithinHours = hour >= startHour && hour < endHour;

    if (!isWeekdayAllowed || !isWithinHours) {
      return res.status(403).json({
        message: `Cafeteria is available only during working hours (${startHour}:00-${endHour}:00)${
          timeZone ? ` ${timeZone}` : ""
        }`,
      });
    }

    next();
  };
};
