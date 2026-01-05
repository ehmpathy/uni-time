import { format } from 'date-fns/format';
import { withAssure } from 'type-fns';

import type { IsoTimeFloat } from '@src/domain.objects/IsoTimeFloat';
import { castInputToDate } from '@src/domain.operations/casts/castInputToDate';

/**
 * .what = casts input to IsoTimeFloat format
 * .why = normalize various input types to strict ISO time
 * .format = HH:mm:ss
 */
export const asIsoTimeFloat = (
  input: Parameters<typeof castInputToDate>[0],
): IsoTimeFloat => format(castInputToDate(input), 'HH:mm:ss') as IsoTimeFloat;

/**
 * .what = validates string is IsoTimeFloat format
 * .why = runtime validation for external input
 * .format = HH:mm:ss (hours 00-23, minutes 00-59, seconds 00-59)
 */
export const isIsoTimeFloat = withAssure(
  (input: string): input is IsoTimeFloat => {
    // must match HH:mm:ss format
    const match = input.match(/^(\d{2}):(\d{2}):(\d{2})$/);
    if (!match) return false;

    // validate semantic ranges
    const hours = parseInt(match[1]!, 10);
    const minutes = parseInt(match[2]!, 10);
    const seconds = parseInt(match[3]!, 10);

    return (
      hours >= 0 &&
      hours <= 23 &&
      minutes >= 0 &&
      minutes <= 59 &&
      seconds >= 0 &&
      seconds <= 59
    );
  },
);
