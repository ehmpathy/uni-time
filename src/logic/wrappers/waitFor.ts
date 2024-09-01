import { HelpfulError } from '@ehmpathy/error-fns';
import { NotUndefined, isNotUndefined } from 'type-fns';

import { UniDuration, toMilliseconds } from '../../domain/UniDuration';
import { sleep } from '../utils/sleep';

const DEFAULT_TIMEOUT: UniDuration = { seconds: 60 };
const DEFAULT_INTERVAL: UniDuration = { seconds: 10 };

export class WaitForTimedOutError extends HelpfulError {}

/**
 * tactic
 * .what: wait for an output
 * .why:
 *   - enables waiting until some desired result is ready
 *   - ensures best practices and a pit of success contract
 *   - uses readable names for maintainability
 */
export const waitFor = async <O>(
  /**
   * the procedure which extracts some output that we are waiting for
   *
   * note
   * - waitFor waits until the extractor returns a value other than `void` or `undefined`
   */
  extractor: () => Promise<O>,

  /**
   * options to control the wait
   */
  options?: {
    /**
     * the interval at which to check for completion
     */
    interval?: UniDuration;

    /**
     * the maximum duration to wait for, until timeout
     */
    timeout?: UniDuration;
  },
): Promise<NotUndefined<O>> => {
  // define the timeout and interval
  const timeout = options?.timeout ?? DEFAULT_TIMEOUT;
  const interval = options?.interval ?? DEFAULT_INTERVAL;

  // track the timestamps of interest
  const startAtMSE: number = new Date().getTime();
  const timeoutAtMSE: number = startAtMSE + toMilliseconds(timeout);

  // check each interval
  while (new Date().getTime() < timeoutAtMSE) {
    const output = await extractor();
    if (isNotUndefined(output)) return output;
    await sleep(interval);
  }

  // throw an error if reached here, since it implies a timeout
  throw new WaitForTimedOutError('no output returned from waitFor.extractor', {
    interval,
    timeout,
  });
};
