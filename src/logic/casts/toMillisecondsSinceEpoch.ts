import { UniDate, UniDateTime } from '../../domain/UniDateTime';

export const toMillisecondsSinceEpoch = (
  input: UniDate | UniDateTime,
): number => new Date(input).getTime();

export { toMillisecondsSinceEpoch as toMse };
