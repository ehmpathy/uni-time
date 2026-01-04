import { isIsoMinuteFloat } from '@src/domain.operations/checks/isIsoMinuteFloat';

describe('isIsoMinuteFloat', () => {
  it('should return true for minute 00', () => {
    expect(isIsoMinuteFloat('00')).toBe(true);
  });

  it('should return true for minute 30', () => {
    expect(isIsoMinuteFloat('30')).toBe(true);
  });

  it('should return true for minute 59', () => {
    expect(isIsoMinuteFloat('59')).toBe(true);
  });

  it('should return false for minute 60', () => {
    expect(isIsoMinuteFloat('60')).toBe(false);
  });

  it('should return false for single digit', () => {
    expect(isIsoMinuteFloat('5')).toBe(false);
  });

  it('should return false for three digits', () => {
    expect(isIsoMinuteFloat('030')).toBe(false);
  });

  it('should return false for full time', () => {
    expect(isIsoMinuteFloat('14:30:00')).toBe(false);
  });

  it('should return false for invalid string', () => {
    expect(isIsoMinuteFloat('invalid')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isIsoMinuteFloat('')).toBe(false);
  });
});
