import { format } from 'date-fns/format';
import { withAssure } from 'type-fns';

import type { IsoMonthFloat } from '@src/domain.objects/IsoTimeFloat';
import { castInputToDate } from '@src/domain.operations/casts/castInputToDate';

/**
 * .what = casts input to IsoMonthFloat format
 * .why = normalize various input types to strict ISO month
 * .format = MM (01-12)
 */
export const asIsoMonthFloat = (
  input: Parameters<typeof castInputToDate>[0],
): IsoMonthFloat => format(castInputToDate(input), 'MM') as IsoMonthFloat;

/**
 * .what = validates string is IsoMonthFloat format
 * .why = runtime validation for external input
 * .format = MM (01-12)
 */
export const isIsoMonthFloat = withAssure(
  (input: string): input is IsoMonthFloat => {
    // must match MM format
    if (!/^\d{2}$/.test(input)) return false;

    // validate range
    const month = parseInt(input, 10);
    return month >= 1 && month <= 12;
  },
);
