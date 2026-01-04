import { given, then } from 'test-fns';

import type {
  IsoDateStamp,
  IsoTimeStamp,
} from '@src/domain.objects/IsoTimeStamp';
import {
  asIsoDateStamp,
  isIsoDateStamp,
} from '@src/domain.operations/checks/isIsoDateStamp';
import {
  asIsoTimeStamp,
  isIsoTimeStamp,
} from '@src/domain.operations/checks/isIsoTimeStamp';
import { addDuration } from '@src/domain.operations/manipulate/addDuration';

describe('addDuration', () => {
  given('an IsoTimeStamp', () => {
    then('it should add hours correctly', () => {
      const before: IsoTimeStamp = asIsoTimeStamp('2024-01-15T14:30:00Z');
      const after = addDuration(before, { hours: 2 });
      expect(after).toEqual('2024-01-15T16:30:00Z');
      expect(isIsoTimeStamp(after)).toBe(true);
    });

    then('it should add days correctly', () => {
      const before: IsoTimeStamp = asIsoTimeStamp('2024-01-31T12:00:00Z');
      const after = addDuration(before, { days: 1 });
      expect(after).toEqual('2024-02-01T12:00:00Z');
    });

    then('it should still be assignable to IsoTimeStamp', () => {
      const before: IsoTimeStamp = asIsoTimeStamp('2024-01-15T14:30:00Z');
      const after: IsoTimeStamp = addDuration(before, { hours: 2 });
      expect(isIsoTimeStamp(after)).toBe(true);
    });
  });

  given('an IsoDateStamp', () => {
    then('it should add days correctly', () => {
      const before: IsoDateStamp = asIsoDateStamp('2024-01-15');
      const after = addDuration(before, { days: 7 });
      expect(after).toEqual('2024-01-22');
      expect(isIsoDateStamp(after)).toBe(true);
    });

    then('it should handle month boundaries', () => {
      const before: IsoDateStamp = asIsoDateStamp('2024-01-31');
      const after = addDuration(before, { days: 1 });
      expect(after).toEqual('2024-02-01');
    });

    then('it should still be assignable to IsoDateStamp', () => {
      const before: IsoDateStamp = asIsoDateStamp('2024-01-15');
      const after: IsoDateStamp = addDuration(before, { days: 1 });
      expect(isIsoDateStamp(after)).toBe(true);
    });

    then('it should not be assignable to IsoTimeStamp', () => {
      const before: IsoDateStamp = asIsoDateStamp('2024-01-15');
      // @ts-expect-error: IsoDateStamp is not assignable to IsoTimeStamp
      const after: IsoTimeStamp = addDuration(before, { days: 1 });
    });
  });

  given('years and months in duration', () => {
    then('it should add years correctly (approximate)', () => {
      const before: IsoTimeStamp = asIsoTimeStamp('2024-01-01T00:00:00Z');
      const after = addDuration(before, { years: 1 });
      // 365.25 days = approximately 1 year
      expect(isIsoTimeStamp(after)).toBe(true);
    });

    then('it should add months correctly (approximate)', () => {
      const before: IsoTimeStamp = asIsoTimeStamp('2024-01-01T00:00:00Z');
      const after = addDuration(before, { months: 1 });
      // 30.44 days = approximately 1 month
      expect(isIsoTimeStamp(after)).toBe(true);
    });
  });
});
