import type { UniDate, UniDateTime } from '@src/domain.objects/UniDateTime';

export const toMillisecondsSinceEpoch = (
  input: UniDate | UniDateTime,
): number => new Date(input).getTime();

export { toMillisecondsSinceEpoch as toMse };
