import { parseISO } from 'date-fns/parseISO';
import { subMilliseconds } from 'date-fns/subMilliseconds';
import type { PickOne } from 'type-fns';

import type { UniDate, UniDateTime } from '@src/domain.objects/UniDateTime';
import type { UniDuration } from '@src/domain.objects/UniDuration';
import { asUniDate, isUniDate } from '@src/domain.operations/checks/isUniDate';
import { asUniDateTime } from '@src/domain.operations/checks/isUniDateTime';

import { toMilliseconds } from './toMilliseconds';

export function subDuration(...args: [UniDateTime, UniDuration]): UniDateTime;
export function subDuration(
  ...args: [UniDate, PickOne<Pick<Required<UniDuration>, 'days'>>]
): UniDate;

/**
 * subtract a duration from a datetime
 */
export function subDuration(
  ...args:
    | [UniDateTime, UniDuration]
    | [UniDate, PickOne<Pick<Required<UniDuration>, 'days'>>]
): UniDate | UniDateTime {
  return isUniDate(args[0])
    ? asUniDate(subMilliseconds(parseISO(args[0]), toMilliseconds(args[1])))
    : asUniDateTime(
        subMilliseconds(parseISO(args[0]), toMilliseconds(args[1])),
      );
}
