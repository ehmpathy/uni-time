import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import { withAssure } from 'type-fns';

import type { IsoYearStamp } from '@src/domain.objects/IsoTimeStamp';
import { castInputToDate } from '@src/domain.operations/casts/castInputToDate';

/**
 * .what = casts input to IsoYearStamp format
 * .why = normalize various input types to strict ISO year
 * .format = yyyy
 */
export const asIsoYearStamp = (
  input: Parameters<typeof castInputToDate>[0],
): IsoYearStamp => format(castInputToDate(input), 'yyyy') as IsoYearStamp;

/**
 * .what = validates string is IsoYearStamp format
 * .why = runtime validation for external input
 */
export const isIsoYearStamp = withAssure(
  (input: string): input is IsoYearStamp => {
    try {
      // must be exactly 4 digits
      if (!/^\d{4}$/.test(input)) return false;

      // parse as first day of year, then format back
      const parsed = parseISO(`${input}-01-01`);
      return asIsoYearStamp(parsed) === input;
    } catch {
      return false;
    }
  },
);
