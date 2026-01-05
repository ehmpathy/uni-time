import type {
  IsoDateStamp,
  IsoMonthStamp,
  IsoTimeStamp,
  IsoYearStamp,
} from '@src/domain.objects/IsoTimeStamp';

describe('IsoTimeStamp types', () => {
  describe('IsoTimeStamp', () => {
    it('should accept valid timestamp format', () => {
      const stamp: IsoTimeStamp = '2024-01-15T14:30:00Z' as IsoTimeStamp;
      expect(stamp).toBeDefined();
    });
  });

  describe('IsoDateStamp', () => {
    it('should accept valid date format', () => {
      const stamp: IsoDateStamp = '2024-01-15' as IsoDateStamp;
      expect(stamp).toBeDefined();
    });

    it('should allow IsoTimeStamp to be assigned to IsoDateStamp', () => {
      const timestamp: IsoTimeStamp = '2024-01-15T14:30:00Z' as IsoTimeStamp;
      const datestamp: IsoDateStamp = timestamp;
      expect(datestamp).toBeDefined();
    });

    it('should NOT allow IsoDateStamp to be assigned to IsoTimeStamp', () => {
      const datestamp: IsoDateStamp = '2024-01-15' as IsoDateStamp;
      // @ts-expect-error - IsoDateStamp is not assignable to IsoTimeStamp
      const _timestamp: IsoTimeStamp = datestamp;
      expect(_timestamp).toBeDefined();
    });
  });

  describe('IsoMonthStamp', () => {
    it('should accept valid month format', () => {
      const stamp: IsoMonthStamp = '2024-01' as IsoMonthStamp;
      expect(stamp).toBeDefined();
    });
  });

  describe('IsoYearStamp', () => {
    it('should accept valid year format', () => {
      const stamp: IsoYearStamp = '2024' as IsoYearStamp;
      expect(stamp).toBeDefined();
    });
  });
});
