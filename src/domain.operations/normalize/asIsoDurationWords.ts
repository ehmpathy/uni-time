import type { IsoDuration } from '@src/domain.objects/IsoDuration';
import type { IsoDurationWords } from '@src/domain.objects/IsoDurationWords';

/**
 * .what = converts duration shape to iso 8601 string format
 * .why = enables conversion from object format to string format
 */
const formatIsoDurationShape = (shape: {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}): IsoDurationWords => {
  // build date part
  let datePart = '';
  if (shape.years) datePart += `${shape.years}Y`;
  if (shape.months) datePart += `${shape.months}M`;
  if (shape.weeks) datePart += `${shape.weeks}W`;
  if (shape.days) datePart += `${shape.days}D`;

  // build time part
  let timePart = '';
  if (shape.hours) timePart += `${shape.hours}H`;
  if (shape.minutes) timePart += `${shape.minutes}M`;

  // handle seconds and milliseconds
  const totalSeconds = (shape.seconds ?? 0) + (shape.milliseconds ?? 0) / 1000;
  if (totalSeconds > 0) {
    // format without excess zeros for clean output
    const formatted =
      totalSeconds % 1 === 0
        ? `${totalSeconds}`
        : `${totalSeconds}`.replace(/\.?0+$/, '');
    timePart += `${formatted}S`;
  }

  // combine parts
  const hasTimePart = timePart.length > 0;
  const result = `P${datePart}${hasTimePart ? 'T' : ''}${timePart}`;

  // handle edge case of empty duration
  if (result === 'P') return 'PT0S' as IsoDurationWords;

  return result as IsoDurationWords;
};

/**
 * .what = normalizes iso duration to string format
 * .why = enables conversion to iso 8601 string representation
 * .note = if input is already string format, returns as-is
 */
export const asIsoDurationWords = (duration: IsoDuration): IsoDurationWords => {
  // if already a string, return as-is
  if (typeof duration === 'string') return duration;

  // otherwise, format from object
  return formatIsoDurationShape(duration);
};
