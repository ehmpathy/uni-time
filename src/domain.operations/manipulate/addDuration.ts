import { addMilliseconds } from 'date-fns/addMilliseconds';
import { parseISO } from 'date-fns/parseISO';

import type { IsoDuration } from '@src/domain.objects/IsoDuration';
import type {
  IsoDateStamp,
  IsoMonthStamp,
  IsoTimeStamp,
} from '@src/domain.objects/IsoTimeStamp';
import {
  asIsoDateStamp,
  isIsoDateStamp,
} from '@src/domain.operations/checks/isIsoDateStamp';
import {
  asIsoMonthStamp,
  isIsoMonthStamp,
} from '@src/domain.operations/checks/isIsoMonthStamp';
import { asIsoTimeStamp } from '@src/domain.operations/checks/isIsoTimeStamp';
import { toMilliseconds } from '@src/domain.operations/manipulate/toMilliseconds';

export function addDuration(
  stamp: IsoTimeStamp,
  duration: IsoDuration,
): IsoTimeStamp;
export function addDuration(
  stamp: IsoDateStamp,
  duration: IsoDuration,
): IsoDateStamp;
export function addDuration(
  stamp: IsoMonthStamp,
  duration: IsoDuration,
): IsoMonthStamp;

/**
 * .what = adds duration to a stamp
 * .why = enables date arithmetic
 * .note = handles month/year boundaries via date-fns
 */
export function addDuration(
  stamp: IsoTimeStamp | IsoDateStamp | IsoMonthStamp,
  duration: IsoDuration,
): IsoTimeStamp | IsoDateStamp | IsoMonthStamp {
  // parse the stamp
  const parsed = parseISO(stamp);

  // add the duration
  const result = addMilliseconds(parsed, toMilliseconds(duration));

  // return in the same format as input
  if (isIsoMonthStamp(stamp)) return asIsoMonthStamp(result);
  if (isIsoDateStamp(stamp)) return asIsoDateStamp(result);
  return asIsoTimeStamp(result);
}
