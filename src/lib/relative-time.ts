export const relativeTime = (date: string): string => {
  const now = new Date();
  const oldDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - oldDate.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (diffInSeconds >= intervals.day && diffInSeconds < intervals.week) {
    if (diffInSeconds < intervals.day * 2) {
      return "yesterday";
    }
  }

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / secondsInUnit);
    if (interval > 1) {
      return `${interval} ${unit}s ago`;
    } else if (interval === 1) {
      return `a ${unit} ago`;
    }
  }

  return "a moment ago";
};
