import { UniDuration, toMilliseconds } from '../domain/UniDuration';

export const sleep = (ms: number | UniDuration): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(resolve, typeof ms === 'number' ? ms : toMilliseconds(ms)),
  );
