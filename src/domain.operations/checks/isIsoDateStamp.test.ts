import {
  asIsoDateStamp,
  isIsoDateStamp,
} from '@src/domain.operations/checks/isIsoDateStamp';

describe('isIsoDateStamp', () => {
  describe('asIsoDateStamp', () => {
    it('should cast Date to IsoDateStamp format', () => {
      const date = new Date('2024-01-15T14:30:00Z');
      const result = asIsoDateStamp(date);
      expect(result).toEqual('2024-01-15');
    });

    it('should cast string to IsoDateStamp format', () => {
      const result = asIsoDateStamp('2024-01-15');
      expect(result).toEqual('2024-01-15');
    });

    it('should cast { mse } to IsoDateStamp format', () => {
      const mse = new Date('2024-01-15T14:30:00Z').getTime();
      const result = asIsoDateStamp({ mse });
      expect(result).toEqual('2024-01-15');
    });
  });

  describe('isIsoDateStamp', () => {
    it('should return true for valid IsoDateStamp format', () => {
      expect(isIsoDateStamp('2024-01-15')).toBe(true);
    });

    it('should return true for leap year date', () => {
      expect(isIsoDateStamp('2024-02-29')).toBe(true);
    });

    it('should return true for year boundary dates', () => {
      expect(isIsoDateStamp('2024-01-01')).toBe(true);
      expect(isIsoDateStamp('2024-12-31')).toBe(true);
    });

    it('should return false for timestamp (not date)', () => {
      expect(isIsoDateStamp('2024-01-15T14:30:00Z')).toBe(false);
    });

    it('should return false for US date format', () => {
      expect(isIsoDateStamp('01-15-2024')).toBe(false);
    });

    it('should return false for human readable format', () => {
      expect(isIsoDateStamp('May 15, 2024')).toBe(false);
    });

    it('should return false for single digit month', () => {
      expect(isIsoDateStamp('2024-1-15')).toBe(false);
    });

    it('should return false for single digit day', () => {
      expect(isIsoDateStamp('2024-01-5')).toBe(false);
    });

    it('should return false for invalid month', () => {
      expect(isIsoDateStamp('2024-13-15')).toBe(false);
    });

    it('should return false for invalid day', () => {
      expect(isIsoDateStamp('2024-01-32')).toBe(false);
    });

    it('should return false for invalid string', () => {
      expect(isIsoDateStamp('invalid')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isIsoDateStamp('')).toBe(false);
    });
  });
});
