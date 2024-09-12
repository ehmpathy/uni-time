import { UnexpectedCodePathError } from '@ehmpathy/error-fns';
import { PickOne } from 'type-fns';

import { UniDateTimeRange } from '../../domain/UniDateTime';
import { UniDuration } from '../../domain/UniDuration';
import { toMse } from '../casts/toMillisecondsSinceEpoch';
import {
  MILLISECONDS_PER_DAY,
  MILLISECONDS_PER_HOUR,
  MILLISECONDS_PER_MINUTE,
  MILLISECONDS_PER_SECOND,
  MILLISECONDS_PER_WEEK,
} from './toMilliseconds';

/**
 * .what = calculates the duration of a time range
 */
export const getDuration = (input: {
  /**
   * what measure of time to extract a duration from
   */
  of: PickOne<{ range: UniDateTimeRange; milliseconds: number }>;

  /**
   * the unit to define the duration in, if desired
   *
   * note
   * - by default, it will define it via all of them
   */
  as?: keyof UniDuration;
}): UniDuration => {
  // handle range inputs
  if (input.of.range)
    return getDuration({
      of: {
        milliseconds: toMse(input.of.range.until) - toMse(input.of.range.since),
      },
      as: input.as,
    });

  // handle milliseconds
  if (input.of.milliseconds) {
    // if asked to define in a specific unit, define it in that unit
    if (input.as) {
      if (input.as === 'weeks')
        return { weeks: input.of.milliseconds / MILLISECONDS_PER_WEEK };
      if (input.as === 'days')
        return { days: input.of.milliseconds / MILLISECONDS_PER_DAY };
      if (input.as === 'hours')
        return { hours: input.of.milliseconds / MILLISECONDS_PER_HOUR };
      if (input.as === 'minutes')
        return { minutes: input.of.milliseconds / MILLISECONDS_PER_MINUTE };
      if (input.as === 'seconds')
        return { seconds: input.of.milliseconds / MILLISECONDS_PER_SECOND };
      if (input.as === 'milliseconds')
        return { milliseconds: input.of.milliseconds };
      throw new UnexpectedCodePathError(
        'input.as does not specify a valid unit',
        { input },
      );
    }

    // otherwise, define it via all of the units
    const weeks = Math.floor(input.of.milliseconds / MILLISECONDS_PER_WEEK);
    const days = Math.floor(
      (input.of.milliseconds % MILLISECONDS_PER_WEEK) / MILLISECONDS_PER_DAY,
    );
    const hours = Math.floor(
      (input.of.milliseconds % MILLISECONDS_PER_DAY) / MILLISECONDS_PER_HOUR,
    );
    const minutes = Math.floor(
      (input.of.milliseconds % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE,
    );
    const seconds = Math.floor(
      (input.of.milliseconds % MILLISECONDS_PER_MINUTE) /
        MILLISECONDS_PER_SECOND,
    );
    const milliseconds = input.of.milliseconds % MILLISECONDS_PER_SECOND;
    const durationWithRedundantZeros = {
      weeks,
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    };
    const duration = Object.fromEntries(
      Object.entries(durationWithRedundantZeros).filter(
        ([key, val]) => val > 0,
      ),
    ) as any as UniDuration;
    return duration;
  }

  // otherwise, unsupported
  throw new UnexpectedCodePathError('input.of choice is not supported', {
    input,
  });
};
