import { UnexpectedCodePathError } from 'helpful-errors';
import type { PickOne } from 'type-fns';

import type { IsoDurationShape } from '@src/domain.objects/IsoDurationShape';
import type {
  IsoDateStampRange,
  IsoTimeStampRange,
} from '@src/domain.objects/IsoTimeStampRange';
import { toMse } from '@src/domain.operations/casts/toMillisecondsSinceEpoch';
import {
  MILLISECONDS_PER_DAY,
  MILLISECONDS_PER_HOUR,
  MILLISECONDS_PER_MINUTE,
  MILLISECONDS_PER_MONTH,
  MILLISECONDS_PER_SECOND,
  MILLISECONDS_PER_WEEK,
  MILLISECONDS_PER_YEAR,
} from '@src/domain.operations/manipulate/toMilliseconds';

/**
 * .what = calculates the duration of a time range
 * .why = enables computing elapsed time between two stamps
 */
export const getDuration = (input: {
  /**
   * what measure of time to extract a duration from
   */
  of: PickOne<{
    range: IsoTimeStampRange | IsoDateStampRange;
    milliseconds: number;
  }>;

  /**
   * the unit to define the duration in, if desired
   *
   * note
   * - by default, it will define it via all of them
   */
  as?: keyof IsoDurationShape;
}): IsoDurationShape => {
  // handle range inputs
  if (input.of.range)
    return getDuration({
      of: {
        milliseconds: toMse(input.of.range.until) - toMse(input.of.range.since),
      },
      as: input.as,
    });

  // handle milliseconds
  if (input.of.milliseconds !== undefined) {
    // if asked to define in a specific unit, define it in that unit
    if (input.as) {
      if (input.as === 'years')
        return { years: input.of.milliseconds / MILLISECONDS_PER_YEAR };
      if (input.as === 'months')
        return { months: input.of.milliseconds / MILLISECONDS_PER_MONTH };
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
    const hasZeroDuration =
      milliseconds === 0 &&
      weeks === 0 &&
      days === 0 &&
      hours === 0 &&
      minutes === 0 &&
      seconds === 0;

    // build duration object with only non-zero values
    const duration: IsoDurationShape = {
      ...(weeks > 0 && { weeks }),
      ...(days > 0 && { days }),
      ...(hours > 0 && { hours }),
      ...(minutes > 0 && { minutes }),
      ...(seconds > 0 && { seconds }),
      ...((milliseconds > 0 || hasZeroDuration) && { milliseconds }),
    } as IsoDurationShape;
    return duration;
  }

  // otherwise, unsupported
  throw new UnexpectedCodePathError('input.of choice is not supported', {
    input,
  });
};
