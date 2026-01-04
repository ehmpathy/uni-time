import { isIsoDayFloat } from '@src/domain.operations/checks/isIsoDayFloat';

describe('isIsoDayFloat', () => {
  it('should return true for day 01', () => {
    expect(isIsoDayFloat('01')).toBe(true);
  });

  it('should return true for day 15', () => {
    expect(isIsoDayFloat('15')).toBe(true);
  });

  it('should return true for day 31', () => {
    expect(isIsoDayFloat('31')).toBe(true);
  });

  it('should return false for day 00', () => {
    expect(isIsoDayFloat('00')).toBe(false);
  });

  it('should return false for day 32', () => {
    expect(isIsoDayFloat('32')).toBe(false);
  });

  it('should return false for single digit', () => {
    expect(isIsoDayFloat('1')).toBe(false);
  });

  it('should return false for three digits', () => {
    expect(isIsoDayFloat('015')).toBe(false);
  });

  it('should return false for date stamp', () => {
    expect(isIsoDayFloat('2024-01-15')).toBe(false);
  });

  it('should return false for invalid string', () => {
    expect(isIsoDayFloat('invalid')).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(isIsoDayFloat('')).toBe(false);
  });
});
