import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import { withAssure } from 'type-fns';

import type { IsoMonthStamp } from '@src/domain.objects/IsoTimeStamp';
import { castInputToDate } from '@src/domain.operations/casts/castInputToDate';

/**
 * .what = casts input to IsoMonthStamp format
 * .why = normalize various input types to strict ISO month
 * .format = yyyy-MM
 */
export const asIsoMonthStamp = (
  input: Parameters<typeof castInputToDate>[0],
): IsoMonthStamp => format(castInputToDate(input), 'yyyy-MM') as IsoMonthStamp;

/**
 * .what = validates string is IsoMonthStamp format
 * .why = runtime validation for external input
 */
export const isIsoMonthStamp = withAssure(
  (input: string): input is IsoMonthStamp => {
    try {
      // parse as first day of month, then format back
      const parsed = parseISO(`${input}-01`);
      return asIsoMonthStamp(parsed) === input;
    } catch {
      return false;
    }
  },
);
