import { format } from 'date-fns/format';
import { withAssure } from 'type-fns';

import type { IsoDayFloat } from '@src/domain.objects/IsoTimeFloat';
import { castInputToDate } from '@src/domain.operations/casts/castInputToDate';

/**
 * .what = casts input to IsoDayFloat format
 * .why = normalize various input types to strict ISO day
 * .format = dd (01-31)
 */
export const asIsoDayFloat = (
  input: Parameters<typeof castInputToDate>[0],
): IsoDayFloat => format(castInputToDate(input), 'dd') as IsoDayFloat;

/**
 * .what = validates string is IsoDayFloat format
 * .why = runtime validation for external input
 * .format = dd (01-31)
 */
export const isIsoDayFloat = withAssure(
  (input: string): input is IsoDayFloat => {
    // must match dd format
    if (!/^\d{2}$/.test(input)) return false;

    // validate range
    const day = parseInt(input, 10);
    return day >= 1 && day <= 31;
  },
);
