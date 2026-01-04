import {
  asIsoYearStamp,
  isIsoYearStamp,
} from '@src/domain.operations/checks/isIsoYearStamp';

describe('isIsoYearStamp', () => {
  describe('asIsoYearStamp', () => {
    it('should cast Date to IsoYearStamp format', () => {
      const date = new Date('2024-01-15T14:30:00Z');
      const result = asIsoYearStamp(date);
      expect(result).toEqual('2024');
    });

    it('should cast string to IsoYearStamp format', () => {
      const result = asIsoYearStamp('2024-01-15');
      expect(result).toEqual('2024');
    });

    it('should cast { mse } to IsoYearStamp format', () => {
      const mse = new Date('2024-01-15T14:30:00Z').getTime();
      const result = asIsoYearStamp({ mse });
      expect(result).toEqual('2024');
    });
  });

  describe('isIsoYearStamp', () => {
    it('should return true for valid IsoYearStamp format', () => {
      expect(isIsoYearStamp('2024')).toBe(true);
    });

    it('should return true for year 2000', () => {
      expect(isIsoYearStamp('2000')).toBe(true);
    });

    it('should return true for year 1999', () => {
      expect(isIsoYearStamp('1999')).toBe(true);
    });

    it('should return true for year far in future', () => {
      expect(isIsoYearStamp('3000')).toBe(true);
    });

    it('should return false for month stamp', () => {
      expect(isIsoYearStamp('2024-01')).toBe(false);
    });

    it('should return false for date stamp', () => {
      expect(isIsoYearStamp('2024-01-15')).toBe(false);
    });

    it('should return false for timestamp', () => {
      expect(isIsoYearStamp('2024-01-15T14:30:00Z')).toBe(false);
    });

    it('should return false for 2 digit year', () => {
      expect(isIsoYearStamp('24')).toBe(false);
    });

    it('should return false for 3 digit year', () => {
      expect(isIsoYearStamp('024')).toBe(false);
    });

    it('should return false for 5 digit year', () => {
      expect(isIsoYearStamp('02024')).toBe(false);
    });

    it('should return false for invalid string', () => {
      expect(isIsoYearStamp('invalid')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isIsoYearStamp('')).toBe(false);
    });
  });
});
