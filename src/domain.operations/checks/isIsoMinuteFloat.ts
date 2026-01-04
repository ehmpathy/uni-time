import { format } from 'date-fns/format';
import { withAssure } from 'type-fns';

import type { IsoMinuteFloat } from '@src/domain.objects/IsoTimeFloat';
import { castInputToDate } from '@src/domain.operations/casts/castInputToDate';

/**
 * .what = casts input to IsoMinuteFloat format
 * .why = normalize various input types to strict ISO minute
 * .format = mm (00-59)
 */
export const asIsoMinuteFloat = (
  input: Parameters<typeof castInputToDate>[0],
): IsoMinuteFloat => format(castInputToDate(input), 'mm') as IsoMinuteFloat;

/**
 * .what = validates string is IsoMinuteFloat format
 * .why = runtime validation for external input
 * .format = mm (00-59)
 */
export const isIsoMinuteFloat = withAssure(
  (input: string): input is IsoMinuteFloat => {
    // must match mm format
    if (!/^\d{2}$/.test(input)) return false;

    // validate range
    const minutes = parseInt(input, 10);
    return minutes >= 0 && minutes <= 59;
  },
);
