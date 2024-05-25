import { UnexpectedCodePathError } from '@ehmpathy/error-fns';
import { format } from 'date-fns';
import { AsOfGlossary } from 'domain-glossaries';
import { PickOne } from 'type-fns';

const castInputToDate = (
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
) => {
  if (input instanceof Date) return input;
  if (typeof input === 'string') return new Date(input);
  if (input.date) return input.date;
  if (input.mse) return new Date(input.mse);
  throw new UnexpectedCodePathError('could not parse date from input', {
    input,
  });
};

/**
 * a universally unambiguous datetime serialized as a string; yyyy-MM-ddThh:mm:ssZ
 */
export type UniDateTime = AsOfGlossary<string, 'uni-time'>;
export const asUniDateTime = (
  input: Parameters<typeof castInputToDate>[0],
): UniDateTime => castInputToDate(input).toISOString() as UniDateTime;

/**
 * a universally unambiguous date serialized as a string; yyyy-MM-dd
 */
export type UniDate = AsOfGlossary<string, 'uni-time'>;
export const asUniDate = (
  input: Parameters<typeof castInputToDate>[0],
): UniDate => format(castInputToDate(input), 'yyyy-MM-dd') as UniDate;

/**
 * a universally unambiguous month serialized as a string; yyyy-MM
 */
export type UniMonth = AsOfGlossary<string, 'uni-time'>;

/**
 * a universally unambiguous date range
 *
 * note
 * - since is inclusive (i.e., you've had freedom _since_ you gained it)
 * - until is exclusive (i.e., you have money _until_ you run out)
 */
export type UniDateRange = AsOfGlossary<
  {
    since: UniDate;
    until: UniDate;
  },
  'uni-time',
  false // this is not required to have the _dglo annotation, since we care about the structure.shape, and not the structure.origin
>;

/**
 * a universally unambiguous datetime range
 *
 * note
 * - since is inclusive (i.e., you've had freedom _since_ you gained it)
 * - until is exclusive (i.e., you have money _until_ you run out)
 */
export type UniDateTimeRange = AsOfGlossary<
  {
    since: UniDateTime;
    until: UniDateTime;
  },
  'uni-time',
  false // this is not required to have the _dglo annotation, since we care about the structure.shape, and not the structure.origin
>;
