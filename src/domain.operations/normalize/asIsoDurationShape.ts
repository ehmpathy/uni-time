import type { IsoDuration } from '@src/domain.objects/IsoDuration';
import type { IsoDurationShape } from '@src/domain.objects/IsoDurationShape';

/**
 * .what = regex pattern to parse iso 8601 duration strings
 * .why = enables extraction of duration components from string format
 */
const ISO_DURATION_REGEX =
  /^P(?:(\d+(?:\.\d+)?)Y)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)W)?(?:(\d+(?:\.\d+)?)D)?(?:T(?:(\d+(?:\.\d+)?)H)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)S)?)?$/;

/**
 * .what = parses an iso 8601 duration string into duration shape
 * .why = enables conversion from string format to object format
 */
const parseIsoDurationWords = (words: string): IsoDurationShape => {
  const match = ISO_DURATION_REGEX.exec(words);
  if (!match) {
    throw new Error(`invalid iso duration string: ${words}`);
  }

  const [, years, months, weeks, days, hours, minutes, seconds] = match;

  // validate at least one component is present
  const hasComponent = [
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
  ].some((v) => v !== undefined);
  if (!hasComponent) {
    throw new Error(`invalid iso duration string: ${words}`);
  }

  // build result with only defined values
  const result: IsoDurationShape = {} as IsoDurationShape;

  if (years !== undefined) result.years = parseFloat(years);
  if (months !== undefined) result.months = parseFloat(months);
  if (weeks !== undefined) result.weeks = parseFloat(weeks);
  if (days !== undefined) result.days = parseFloat(days);
  if (hours !== undefined) result.hours = parseFloat(hours);
  if (minutes !== undefined) result.minutes = parseFloat(minutes);
  if (seconds !== undefined) {
    // handle decimal seconds by split into seconds and milliseconds
    const totalSeconds = parseFloat(seconds);
    const wholeSeconds = Math.floor(totalSeconds);
    const fractionalMs = Math.round((totalSeconds - wholeSeconds) * 1000);

    if (wholeSeconds > 0 || fractionalMs === 0) result.seconds = wholeSeconds;
    if (fractionalMs > 0) result.milliseconds = fractionalMs;
  }

  return result;
};

/**
 * .what = normalizes iso duration to object shape
 * .why = enables operations to work with both string and object formats
 * .note = if input is already object shape, returns as-is
 */
export const asIsoDurationShape = (duration: IsoDuration): IsoDurationShape => {
  // if already an object, return as-is
  if (typeof duration === 'object') return duration;

  // otherwise, parse from string
  return parseIsoDurationWords(duration);
};
