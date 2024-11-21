import { format, parseISO } from 'date-fns';
import { withAssure } from 'type-fns';

import { UniDate } from '../../domain/UniDateTime';
import { castInputToDate } from '../casts/castInputToDate';

/**
 * casts a date like input into a UniDate
 */
export const asUniMonth = (
  input: Parameters<typeof castInputToDate>[0],
): UniDate => format(castInputToDate(input), 'yyyy-MM') as UniDate;

/**
 * checks whether a string literal input is a UniDate
 */
export const isUniMonth = withAssure((input: string): input is UniDate => {
  try {
    return asUniMonth(parseISO(input)) === input;
  } catch {
    return false;
  }
});
