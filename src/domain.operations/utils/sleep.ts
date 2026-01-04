import type { UniDuration } from '@src/domain.objects/UniDuration';
import { toMilliseconds } from '@src/domain.operations/manipulate/toMilliseconds';

export const sleep = (ms: number | UniDuration): Promise<void> =>
  new Promise((resolve) =>
    setTimeout(resolve, typeof ms === 'number' ? ms : toMilliseconds(ms)),
  );
