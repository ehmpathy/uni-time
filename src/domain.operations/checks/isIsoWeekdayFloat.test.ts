import { isIsoWeekdayFloat } from '@src/domain.operations/checks/isIsoWeekdayFloat';

describe('isIsoWeekdayFloat', () => {
  it('should return true for weekday 1 (monday)', () => {
    expect(isIsoWeekdayFloat('1')).toBe(true);
  });

  it('should return true for weekday 4 (thursday)', () => {
    expect(isIsoWeekdayFloat('4')).toBe(true);
  });

  it('should return true for weekday 7 (sunday)', () => {
    expect(isIsoWeekdayFloat('7')).toBe(true);
  });

  it('should return false for weekday 0', () => {
    expect(isIsoWeekdayFloat('0')).toBe(false);
  });

  it('should return false for weekday 8', () => {
    expect(isIsoWeekdayFloat('8')).toBe(false);
  });

  it('should return false for two digits', () => {
    expect(isIsoWeekdayFloat('01')).toBe(false);
  });

  it('should return false for three digits', () => {
    expect(isIsoWeekdayFloat('001')).toBe(false);
  });

  it('should return false for date stamp', () => {
    expect(isIsoWeekdayFloat('2024-01-15')).toBe(false);
  });

  it('should return false for invalid string', () => {
    expect(isIsoWeekdayFloat('invalid')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isIsoWeekdayFloat('')).toBe(false);
  });
});
