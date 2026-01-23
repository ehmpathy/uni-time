import type { IsoDuration } from '@src/domain.objects/IsoDuration';
import type { IsoDurationShape } from '@src/domain.objects/IsoDurationShape';
import { getDuration } from '@src/domain.operations/manipulate/getDuration';
import { toMilliseconds } from '@src/domain.operations/manipulate/toMilliseconds';

/**
 * .what = sums multiple iso durations into one
 * .why = enables duration arithmetic for total elapsed time
 */
export function sumDurations(durations: IsoDuration[]): IsoDurationShape;
export function sumDurations(
  durations: IsoDuration[],
  options: { as: keyof IsoDurationShape },
): IsoDurationShape;
export function sumDurations(...durations: IsoDuration[]): IsoDurationShape;
export function sumDurations(
  ...args:
    | IsoDuration[]
    | [IsoDuration[]]
    | [IsoDuration[], { as: keyof IsoDurationShape }]
): IsoDurationShape {
  // detect if first arg is array or spread
  const isArrayInput = args.length >= 1 && Array.isArray(args[0]);

  // extract durations and options
  const durations: IsoDuration[] = isArrayInput
    ? (args[0] as IsoDuration[])
    : (args as IsoDuration[]);
  const options =
    isArrayInput && args.length === 2
      ? (args[1] as { as: keyof IsoDurationShape })
      : undefined;

  // sum all durations via milliseconds
  const totalMilliseconds = durations.reduce(
    (total, duration) => total + toMilliseconds(duration),
    0,
  );

  // return as duration shape
  return getDuration({
    of: { milliseconds: totalMilliseconds },
    as: options?.as,
  });
}
