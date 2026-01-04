import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import { withAssure } from 'type-fns';

import type { IsoTimeStamp } from '@src/domain.objects/IsoTimeStamp';
import { castInputToDate } from '@src/domain.operations/casts/castInputToDate';

/**
 * .what = casts input to IsoTimeStamp format
 * .why = normalize various input types to strict ISO timestamp
 * .format = yyyy-MM-ddTHH:mm:ssZ
 */
export const asIsoTimeStamp = (
  input: Parameters<typeof castInputToDate>[0],
): IsoTimeStamp =>
  format(castInputToDate(input), "yyyy-MM-dd'T'HH:mm:ss'Z'") as IsoTimeStamp;

/**
 * .what = validates string is IsoTimeStamp format
 * .why = runtime validation for external input
 */
export const isIsoTimeStamp = withAssure(
  (input: string): input is IsoTimeStamp => {
    try {
      return asIsoTimeStamp(parseISO(input)) === input;
    } catch {
      return false;
    }
  },
);
