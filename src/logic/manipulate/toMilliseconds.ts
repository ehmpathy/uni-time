import { UniDuration } from '../../domain/UniDuration';

export const DAYS_PER_WEEK = 7;
export const HOURS_PER_DAY = 24;
export const MINUTES_PER_HOUR = 60;
export const SECONDS_PER_MINUTE = 60;
export const MILLISECONDS_PER_SECOND = 1000;
export const MILLISECONDS_PER_MINUTE =
  MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE;
export const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR;
export const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * HOURS_PER_DAY;
export const MILLISECONDS_PER_WEEK = MILLISECONDS_PER_DAY * DAYS_PER_WEEK;

export const toMilliseconds = (duration: UniDuration): number => {
  const total = [
    (duration.weeks ?? 0) * MILLISECONDS_PER_WEEK,
    (duration.days ?? 0) * MILLISECONDS_PER_DAY,
    (duration.hours ?? 0) * MILLISECONDS_PER_HOUR,
    (duration.minutes ?? 0) * MILLISECONDS_PER_MINUTE,
    (duration.seconds ?? 0) * MILLISECONDS_PER_SECOND,
    duration.milliseconds ?? 0,
  ].reduce((totalNow, thisMilliseconds) => totalNow + thisMilliseconds, 0);
  return total;
};
