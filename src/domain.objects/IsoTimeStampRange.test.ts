import type {
  IsoDateStamp,
  IsoTimeStamp,
} from '@src/domain.objects/IsoTimeStamp';
import type {
  IsoDateStampRange,
  IsoTimeStampRange,
} from '@src/domain.objects/IsoTimeStampRange';

describe('IsoTimeStampRange types', () => {
  describe('IsoTimeStampRange', () => {
    it('should accept valid timestamp range', () => {
      const range: IsoTimeStampRange = {
        since: '2024-01-15T14:30:00Z' as IsoTimeStamp,
        until: '2024-01-15T16:30:00Z' as IsoTimeStamp,
      };
      expect(range).toBeDefined();
      expect(range.since).toBe('2024-01-15T14:30:00Z');
      expect(range.until).toBe('2024-01-15T16:30:00Z');
    });
  });

  describe('IsoDateStampRange', () => {
    it('should accept valid date range', () => {
      const range: IsoDateStampRange = {
        since: '2024-01-15' as IsoDateStamp,
        until: '2024-01-22' as IsoDateStamp,
      };
      expect(range).toBeDefined();
      expect(range.since).toBe('2024-01-15');
      expect(range.until).toBe('2024-01-22');
    });

    it('should allow IsoTimeStampRange to be assigned to IsoDateStampRange', () => {
      const timestampRange: IsoTimeStampRange = {
        since: '2024-01-15T14:30:00Z' as IsoTimeStamp,
        until: '2024-01-15T16:30:00Z' as IsoTimeStamp,
      };
      const dateRange: IsoDateStampRange = timestampRange;
      expect(dateRange).toBeDefined();
    });

    it('should NOT allow IsoDateStampRange to be assigned to IsoTimeStampRange', () => {
      const dateRange: IsoDateStampRange = {
        since: '2024-01-15' as IsoDateStamp,
        until: '2024-01-22' as IsoDateStamp,
      };
      // @ts-expect-error - IsoDateStampRange is not assignable to IsoTimeStampRange
      const _timestampRange: IsoTimeStampRange = dateRange;
      expect(_timestampRange).toBeDefined();
    });
  });
});
