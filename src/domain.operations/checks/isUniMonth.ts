import { format, parseISO } from 'date-fns';
import { withAssure } from 'type-fns';

import type { UniMonth } from '@src/domain.objects/UniDateTime';
import { castInputToDate } from '@src/domain.operations/casts/castInputToDate';

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
