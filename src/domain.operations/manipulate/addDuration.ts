import { addMilliseconds } from 'date-fns/addMilliseconds';
import { parseISO } from 'date-fns/parseISO';
import type { PickOne } from 'type-fns';

import type { UniDate, UniDateTime } from '@src/domain.objects/UniDateTime';
import type { UniDuration } from '@src/domain.objects/UniDuration';
import { asUniDate, isUniDate } from '@src/domain.operations/checks/isUniDate';
import { asUniDateTime } from '@src/domain.operations/checks/isUniDateTime';

import { toMilliseconds } from './toMilliseconds';

export function addDuration(...args: [UniDateTime, UniDuration]): UniDateTime;
export function addDuration(
  ...args: [UniDate, PickOne<Pick<Required<UniDuration>, 'days'>>]
): UniDate;

/**
 * add a duration to a datetime
 */
export function addDuration(
  ...args:
    | [UniDateTime, UniDuration]
    | [UniDate, PickOne<Pick<Required<UniDuration>, 'days'>>]
): UniDate | UniDateTime {
  return isUniDate(args[0])
    ? asUniDate(addMilliseconds(parseISO(args[0]), toMilliseconds(args[1])))
    : asUniDateTime(
        addMilliseconds(parseISO(args[0]), toMilliseconds(args[1])),
      );
}
