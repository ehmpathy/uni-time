import { format } from 'date-fns/format';
import { withAssure } from 'type-fns';

import type { IsoWeekdayFloat } from '@src/domain.objects/IsoTimeFloat';
import { castInputToDate } from '@src/domain.operations/casts/castInputToDate';

/**
 * .what = casts input to IsoWeekdayFloat format
 * .why = normalize various input types to strict ISO weekday
 * .format = i (1-7, monday=1, sunday=7)
 */
export const asIsoWeekdayFloat = (
  input: Parameters<typeof castInputToDate>[0],
): IsoWeekdayFloat => format(castInputToDate(input), 'i') as IsoWeekdayFloat;

/**
 * .what = validates string is IsoWeekdayFloat format
 * .why = runtime validation for external input
 * .format = d (1-7, monday=1, sunday=7)
 */
export const isIsoWeekdayFloat = withAssure(
  (input: string): input is IsoWeekdayFloat => {
    // must match single digit format
    if (!/^\d$/.test(input)) return false;

    // validate range
    const weekday = parseInt(input, 10);
    return weekday >= 1 && weekday <= 7;
  },
);
