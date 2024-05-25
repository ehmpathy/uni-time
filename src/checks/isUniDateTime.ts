import { parseISO } from 'date-fns';
import { withAssure } from 'type-fns';

import { castInputToDate } from '../casts/castInputToDate';
import { UniDateTime } from '../domain/UniDateTime';

/**
 * casts a datetime like input into a uniDateTime
 */
export const asUniDateTime = (
  input: Parameters<typeof castInputToDate>[0],
): UniDateTime => castInputToDate(input).toISOString() as UniDateTime;

/**
 * checks whether a string literal input is a UniDateTime
 */
export const isUniDateTime = withAssure(
  (input: string): input is UniDateTime => {
    try {
      return asUniDateTime(parseISO(input)) === input;
    } catch {
      return false;
    }
  },
);
