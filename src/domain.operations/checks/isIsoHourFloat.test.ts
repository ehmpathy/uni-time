import { isIsoHourFloat } from '@src/domain.operations/checks/isIsoHourFloat';

describe('isIsoHourFloat', () => {
  it('should return true for hour 00', () => {
    expect(isIsoHourFloat('00')).toBe(true);
  });

  it('should return true for hour 14', () => {
    expect(isIsoHourFloat('14')).toBe(true);
  });

  it('should return true for hour 23', () => {
    expect(isIsoHourFloat('23')).toBe(true);
  });

  it('should return false for hour 24', () => {
    expect(isIsoHourFloat('24')).toBe(false);
  });

  it('should return false for single digit', () => {
    expect(isIsoHourFloat('9')).toBe(false);
  });

  it('should return false for three digits', () => {
    expect(isIsoHourFloat('014')).toBe(false);
  });

  it('should return false for full time', () => {
    expect(isIsoHourFloat('14:30:00')).toBe(false);
  });

  it('should return false for invalid string', () => {
    expect(isIsoHourFloat('invalid')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isIsoHourFloat('')).toBe(false);
  });
});
