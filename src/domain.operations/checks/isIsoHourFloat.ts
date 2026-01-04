import { format } from 'date-fns/format';
import { withAssure } from 'type-fns';

import type { IsoHourFloat } from '@src/domain.objects/IsoTimeFloat';
import { castInputToDate } from '@src/domain.operations/casts/castInputToDate';

/**
 * .what = casts input to IsoHourFloat format
 * .why = normalize various input types to strict ISO hour
 * .format = HH (00-23)
 */
export const asIsoHourFloat = (
  input: Parameters<typeof castInputToDate>[0],
): IsoHourFloat => format(castInputToDate(input), 'HH') as IsoHourFloat;

/**
 * .what = validates string is IsoHourFloat format
 * .why = runtime validation for external input
 * .format = HH (00-23)
 */
export const isIsoHourFloat = withAssure(
  (input: string): input is IsoHourFloat => {
    // must match HH format
    if (!/^\d{2}$/.test(input)) return false;

    // validate range
    const hours = parseInt(input, 10);
    return hours >= 0 && hours <= 23;
  },
);
