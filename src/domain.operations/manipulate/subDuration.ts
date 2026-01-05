import { parseISO } from 'date-fns/parseISO';
import { subMilliseconds } from 'date-fns/subMilliseconds';

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

export function subDuration(
  stamp: IsoTimeStamp,
  duration: IsoDuration,
): IsoTimeStamp;
export function subDuration(
  stamp: IsoDateStamp,
  duration: IsoDuration,
): IsoDateStamp;
export function subDuration(
  stamp: IsoMonthStamp,
  duration: IsoDuration,
): IsoMonthStamp;

/**
 * .what = subtracts duration from a stamp
 * .why = enables date arithmetic
 * .note = handles month/year boundaries via date-fns
 */
export function subDuration(
  stamp: IsoTimeStamp | IsoDateStamp | IsoMonthStamp,
  duration: IsoDuration,
): IsoTimeStamp | IsoDateStamp | IsoMonthStamp {
  // parse the stamp
  const parsed = parseISO(stamp);

  // subtract the duration
  const result = subMilliseconds(parsed, toMilliseconds(duration));

  // return in the same format as input
  if (isIsoMonthStamp(stamp)) return asIsoMonthStamp(result);
  if (isIsoDateStamp(stamp)) return asIsoDateStamp(result);
  return asIsoTimeStamp(result);
}
