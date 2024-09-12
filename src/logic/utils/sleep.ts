import { UniDuration } from '../../domain/UniDuration';
import { toMilliseconds } from '../manipulate/toMilliseconds';

export const sleep = (ms: number | UniDuration): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(resolve, typeof ms === 'number' ? ms : toMilliseconds(ms)),
  );
