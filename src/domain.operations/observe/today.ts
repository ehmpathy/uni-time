import type { IsoDateStamp } from '@src/domain.objects/IsoTimeStamp';
import { asIsoDateStamp } from '@src/domain.operations/checks/isIsoDateStamp';

/**
 * .what = returns current UTC date
 * .why = provides type-safe access to current date
 * .format = yyyy-MM-dd
 */
export const today = (): IsoDateStamp => asIsoDateStamp(new Date());
