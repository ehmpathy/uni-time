import { isIsoTimeFloat } from '@src/domain.operations/checks/isIsoTimeFloat';

describe('isIsoTimeFloat', () => {
  it('should return true for valid time format', () => {
    expect(isIsoTimeFloat('14:30:00')).toBe(true);
  });

  it('should return true for midnight', () => {
    expect(isIsoTimeFloat('00:00:00')).toBe(true);
  });

  it('should return true for end of day', () => {
    expect(isIsoTimeFloat('23:59:59')).toBe(true);
  });

  it('should return false for time without seconds', () => {
    expect(isIsoTimeFloat('14:30')).toBe(false);
  });

  it('should return false for single digit hour', () => {
    expect(isIsoTimeFloat('9:30:00')).toBe(false);
  });

  it('should return false for hour 24', () => {
    expect(isIsoTimeFloat('24:00:00')).toBe(false);
  });

  it('should return false for minute 60', () => {
    expect(isIsoTimeFloat('14:60:00')).toBe(false);
  });

  it('should return false for second 60', () => {
    expect(isIsoTimeFloat('14:30:60')).toBe(false);
  });

  it('should return false for full timestamp', () => {
    expect(isIsoTimeFloat('2024-01-15T14:30:00Z')).toBe(false);
  });

  it('should return false for invalid string', () => {
    expect(isIsoTimeFloat('invalid')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isIsoTimeFloat('')).toBe(false);
  });
});
