import { UnexpectedCodePathError } from '@ehmpathy/error-fns';
import { PickOne } from 'type-fns';

export const castInputToDate = (
  input:
    | string
    | Date
    | PickOne<{
        /**
         * milliseconds since epoch
         */
        mse: number;

        /**
         * a date
         */
        date: Date;
      }>,
): Date => {
  if (input instanceof Date) return input;
  if (typeof input === 'string') return new Date(input);
  if (input.date) return input.date;
  if (input.mse) return new Date(input.mse);
  throw new UnexpectedCodePathError('could not parse date from input', {
    input,
  });
};
