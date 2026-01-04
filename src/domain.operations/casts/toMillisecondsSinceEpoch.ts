import type {
  IsoDateStamp,
  IsoTimeStamp,
} from '@src/domain.objects/IsoTimeStamp';

/**
 * .what = converts stamp to milliseconds since epoch
 * .why = enables comparison and arithmetic with raw millisecond values
 */
export const toMillisecondsSinceEpoch = (
  input: IsoTimeStamp | IsoDateStamp,
): number => new Date(input).getTime();

export { toMillisecondsSinceEpoch as toMse };
