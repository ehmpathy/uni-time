import { isIsoMonthFloat } from '@src/domain.operations/checks/isIsoMonthFloat';

describe('isIsoMonthFloat', () => {
  it('should return true for month 01', () => {
    expect(isIsoMonthFloat('01')).toBe(true);
  });

  it('should return true for month 06', () => {
    expect(isIsoMonthFloat('06')).toBe(true);
  });

  it('should return true for month 12', () => {
    expect(isIsoMonthFloat('12')).toBe(true);
  });

  it('should return false for month 00', () => {
    expect(isIsoMonthFloat('00')).toBe(false);
  });

  it('should return false for month 13', () => {
    expect(isIsoMonthFloat('13')).toBe(false);
  });

  it('should return false for single digit', () => {
    expect(isIsoMonthFloat('1')).toBe(false);
  });

  it('should return false for three digits', () => {
    expect(isIsoMonthFloat('012')).toBe(false);
  });

  it('should return false for month stamp', () => {
    expect(isIsoMonthFloat('2024-01')).toBe(false);
  });

  it('should return false for invalid string', () => {
    expect(isIsoMonthFloat('invalid')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isIsoMonthFloat('')).toBe(false);
  });
});
