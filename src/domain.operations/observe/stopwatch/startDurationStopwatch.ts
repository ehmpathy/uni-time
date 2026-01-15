import { hrtime } from 'process';
import type { LogLevel } from 'simple-log-methods';
import type { VisualogicContext } from 'visualogic';

import type { IsoDuration } from '@src/domain.objects/IsoDuration';
import { toMilliseconds } from '@src/domain.operations/manipulate/toMilliseconds';

const roundToHundredths = (num: number) => Math.round(num * 100) / 100; // https://stackoverflow.com/a/14968691/3068233

interface StopOptions {
  log?: boolean | { threshold?: IsoDuration; level?: LogLevel };
}

/**
 * .what = a procedure which returns a duration stopwatch
 * .what.intent =
 *   - start a duration stopwatch for a given reason
 *   - stop it when ready, with optional log ability
 */
export const startDurationStopwatch = (
  input: { for: string } & StopOptions,
  context: VisualogicContext,
) => {
  const logOptionsDefault = input.log;
  const title = input.for;
  const startTimeInNanoseconds = hrtime.bigint();

  // define how to stop the stopwatch
  const stop = (
    input?: StopOptions,
  ): { duration: { milliseconds: number } } => {
    const logOptions = input?.log ?? logOptionsDefault;

    // compute the duration
    const endTimeInNanoseconds = hrtime.bigint();
    const durationInNanoseconds = endTimeInNanoseconds - startTimeInNanoseconds;
    const durationInMilliseconds = roundToHundredths(
      Number(durationInNanoseconds) / 1e6,
    ); // https://stackoverflow.com/a/53970656/3068233
    const output = { duration: { milliseconds: durationInMilliseconds } };

    // determine if we are allowed to log, based on user input
    const canLog = logOptions !== false;
    if (!canLog) return output;

    // determine if we should log, based on threshold
    const durationThresholdInMilliseconds = toMilliseconds(
      typeof logOptions === 'boolean' || !logOptions?.threshold
        ? { seconds: 1 }
        : logOptions.threshold,
    );
    const durationThresholdWasBreached =
      durationThresholdInMilliseconds <= durationInMilliseconds;
    if (!durationThresholdWasBreached) return output;

    // log the duration in human words, since allowed and should
    const logLevel =
      typeof logOptions === 'boolean' || !logOptions?.level
        ? 'debug'
        : logOptions.level;
    const durationInSeconds = roundToHundredths(
      Number(durationInNanoseconds) / 1e9,
    ); // https://stackoverflow.com/a/53970656/3068233
    context.log[logLevel](
      `${title} took ${durationInSeconds} seconds to execute`,
      {
        for: title,
        duration: {
          seconds: durationInSeconds,
          milliseconds: durationInMilliseconds,
        },
      },
    );
    return output;
  };

  // return the stopwatch
  return {
    // lap, // todo: enable "laps" reports
    stop,
  };
};
