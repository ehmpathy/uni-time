import {
  asIsoMonthStamp,
  isIsoMonthStamp,
} from '@src/domain.operations/checks/isIsoMonthStamp';

describe('isIsoMonthStamp', () => {
  describe('asIsoMonthStamp', () => {
    it('should cast Date to IsoMonthStamp format', () => {
      const date = new Date('2024-01-15T14:30:00Z');
      const result = asIsoMonthStamp(date);
      expect(result).toEqual('2024-01');
    });

    it('should cast string to IsoMonthStamp format', () => {
      const result = asIsoMonthStamp('2024-01-15');
      expect(result).toEqual('2024-01');
    });

    it('should cast { mse } to IsoMonthStamp format', () => {
      const mse = new Date('2024-01-15T14:30:00Z').getTime();
      const result = asIsoMonthStamp({ mse });
      expect(result).toEqual('2024-01');
    });
  });

  describe('isIsoMonthStamp', () => {
    it('should return true for valid IsoMonthStamp format', () => {
      expect(isIsoMonthStamp('2024-01')).toBe(true);
    });

    it('should return true for december', () => {
      expect(isIsoMonthStamp('2024-12')).toBe(true);
    });

    it('should return true for january', () => {
      expect(isIsoMonthStamp('2024-01')).toBe(true);
    });

    it('should return false for full date (not month)', () => {
      expect(isIsoMonthStamp('2024-01-15')).toBe(false);
    });

    it('should return false for timestamp', () => {
      expect(isIsoMonthStamp('2024-01-15T14:30:00Z')).toBe(false);
    });

    it('should return false for single digit month', () => {
      expect(isIsoMonthStamp('2024-1')).toBe(false);
    });

    it('should return false for invalid month', () => {
      expect(isIsoMonthStamp('2024-13')).toBe(false);
    });

    it('should return false for month zero', () => {
      expect(isIsoMonthStamp('2024-00')).toBe(false);
    });

    it('should return false for year only', () => {
      expect(isIsoMonthStamp('2024')).toBe(false);
    });

    it('should return false for invalid string', () => {
      expect(isIsoMonthStamp('invalid')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isIsoMonthStamp('')).toBe(false);
    });
  });
});
