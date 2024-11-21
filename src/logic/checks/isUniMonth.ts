import { format, parseISO } from 'date-fns';
import { withAssure } from 'type-fns';

import { UniMonth } from '../../domain/UniDateTime';
import { castInputToDate } from '../casts/castInputToDate';

/**
 * casts a date like input into a UniDate
 */
export const asUniMonth = (
  input: Parameters<typeof castInputToDate>[0],
): UniMonth => format(castInputToDate(input), 'yyyy-MM') as UniMonth;

/**
 * checks whether a string literal input is a UniDate
 */
export const isUniMonth = withAssure((input: string): input is UniMonth => {
  try {
    return asUniMonth(parseISO(input)) === input;
  } catch {
    return false;
  }
});
