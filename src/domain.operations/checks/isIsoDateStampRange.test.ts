import { isIsoDateStampRange } from '@src/domain.operations/checks/isIsoDateStampRange';

describe('isIsoDateStampRange', () => {
  it('should return true for valid range', () => {
    expect(
      isIsoDateStampRange({
        since: '2024-01-15',
        until: '2024-01-22',
      }),
    ).toBe(true);
  });

  it('should return true for same since and until', () => {
    expect(
      isIsoDateStampRange({
        since: '2024-01-15',
        until: '2024-01-15',
      }),
    ).toBe(true);
  });

  it('should return true for reverse order (until before since)', () => {
    expect(
      isIsoDateStampRange({
        since: '2024-01-22',
        until: '2024-01-15',
      }),
    ).toBe(true);
  });

  it('should return false for timestamps (not dates)', () => {
    expect(
      isIsoDateStampRange({
        since: '2024-01-15T14:30:00Z',
        until: '2024-01-15T16:30:00Z',
      }),
    ).toBe(false);
  });

  it('should return false for wrong keys (start/end)', () => {
    expect(
      isIsoDateStampRange({
        start: '2024-01-15',
        end: '2024-01-22',
      }),
    ).toBe(false);
  });

  it('should return false for wrong keys (from/to)', () => {
    expect(
      isIsoDateStampRange({
        from: '2024-01-15',
        to: '2024-01-22',
      }),
    ).toBe(false);
  });

  it('should return false for null', () => {
    expect(isIsoDateStampRange(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isIsoDateStampRange(undefined)).toBe(false);
  });

  it('should return false for string', () => {
    expect(isIsoDateStampRange('2024-01-15')).toBe(false);
  });

  it('should return false for array', () => {
    expect(isIsoDateStampRange(['2024-01-15', '2024-01-22'])).toBe(false);
  });

  it('should return false for empty object', () => {
    expect(isIsoDateStampRange({})).toBe(false);
  });

  it('should return false when since is invalid', () => {
    expect(
      isIsoDateStampRange({
        since: 'invalid',
        until: '2024-01-22',
      }),
    ).toBe(false);
  });

  it('should return false when until is invalid', () => {
    expect(
      isIsoDateStampRange({
        since: '2024-01-15',
        until: 'invalid',
      }),
    ).toBe(false);
  });
});
