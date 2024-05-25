import { UnexpectedCodePathError } from '@ehmpathy/error-fns';
import { AsOfGlossary } from 'domain-glossaries';
import { PickOne } from 'type-fns';

export type UniDuration = AsOfGlossary<
  PickOne<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
  }>,
  'uni-time',
  false
>;

export const toMilliseconds = (duration: UniDuration): number => {
  if (duration.days) return duration.days * 24 * 60 * 60 * 1000;
  if (duration.hours) return duration.hours * 60 * 60 * 1000;
  if (duration.minutes) return duration.minutes * 60 * 1000;
  if (duration.seconds) return duration.seconds * 1000;
  if (duration.milliseconds) return duration.milliseconds;
  throw new UnexpectedCodePathError(
    'unsupported duration unit to convert to milliseconds',
    { duration },
  );
};
