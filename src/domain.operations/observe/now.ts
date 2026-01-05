import type { IsoTimeStamp } from '@src/domain.objects/IsoTimeStamp';
import { asIsoTimeStamp } from '@src/domain.operations/checks/isIsoTimeStamp';

/**
 * .what = returns current UTC timestamp
 * .why = provides type-safe access to current time
 * .format = yyyy-MM-ddTHH:mm:ssZ
 */
export const now = (): IsoTimeStamp => asIsoTimeStamp(new Date());
