import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import { withAssure } from 'type-fns';

import type { IsoDateStamp } from '@src/domain.objects/IsoTimeStamp';
import { castInputToDate } from '@src/domain.operations/casts/castInputToDate';

/**
 * .what = casts input to IsoDateStamp format
 * .why = normalize various input types to strict ISO date
 * .format = yyyy-MM-dd
 */
export const asIsoDateStamp = (
  input: Parameters<typeof castInputToDate>[0],
): IsoDateStamp => format(castInputToDate(input), 'yyyy-MM-dd') as IsoDateStamp;

/**
 * .what = validates string is IsoDateStamp format
 * .why = runtime validation for external input
 */
export const isIsoDateStamp = withAssure(
  (input: string): input is IsoDateStamp => {
    try {
      return asIsoDateStamp(parseISO(input)) === input;
    } catch {
      return false;
    }
  },
);
