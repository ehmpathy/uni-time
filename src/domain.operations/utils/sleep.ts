import type { IsoDuration } from '@src/domain.objects/IsoDuration';
import { toMilliseconds } from '@src/domain.operations/manipulate/toMilliseconds';

/**
 * .what = pauses execution for specified duration
 * .why = enables timed delays in async flows
 */
export const sleep = (ms: number | IsoDuration): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(resolve, typeof ms === 'number' ? ms : toMilliseconds(ms)),
  );
