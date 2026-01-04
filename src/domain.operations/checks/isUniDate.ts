import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import { withAssure } from 'type-fns';

import type { UniDate } from '@src/domain.objects/UniDateTime';
import { castInputToDate } from '@src/domain.operations/casts/castInputToDate';

/**
 * casts a date like input into a UniDate
 */
export const asUniDate = (
  input: Parameters<typeof castInputToDate>[0],
): UniDate => format(castInputToDate(input), 'yyyy-MM-dd') as UniDate;

/**
 * checks whether a string literal input is a UniDate
 */
export const isUniDate = withAssure((input: string): input is UniDate => {
  try {
    return asUniDate(parseISO(input)) === input;
  } catch {
    return false;
  }
});
