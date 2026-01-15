import type { IsoDuration } from '@src/domain.objects/IsoDuration';
import { asIsoDurationShape } from '@src/domain.operations/normalize/asIsoDurationShape';

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

// approximate constants for calendar-based durations
export const DAYS_PER_YEAR = 365.25;
export const DAYS_PER_MONTH = 30.44;
export const MILLISECONDS_PER_MONTH = MILLISECONDS_PER_DAY * DAYS_PER_MONTH;
export const MILLISECONDS_PER_YEAR = MILLISECONDS_PER_DAY * DAYS_PER_YEAR;

/**
 * .what = converts duration to milliseconds
 * .why = enables duration arithmetic and comparison
 * .note = years and months use approximate values (365.25 days/year, 30.44 days/month)
 */
export const toMilliseconds = (duration: IsoDuration): number => {
  // normalize to object shape (handles both string and object formats)
  const shape = asIsoDurationShape(duration);

  const total = [
    (shape.years ?? 0) * MILLISECONDS_PER_YEAR,
    (shape.months ?? 0) * MILLISECONDS_PER_MONTH,
    (shape.weeks ?? 0) * MILLISECONDS_PER_WEEK,
    (shape.days ?? 0) * MILLISECONDS_PER_DAY,
    (shape.hours ?? 0) * MILLISECONDS_PER_HOUR,
    (shape.minutes ?? 0) * MILLISECONDS_PER_MINUTE,
    (shape.seconds ?? 0) * MILLISECONDS_PER_SECOND,
    shape.milliseconds ?? 0,
  ].reduce((totalNow, thisMilliseconds) => totalNow + thisMilliseconds, 0);
  return total;
};
