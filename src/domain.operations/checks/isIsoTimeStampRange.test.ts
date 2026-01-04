import { isIsoTimeStampRange } from '@src/domain.operations/checks/isIsoTimeStampRange';

describe('isIsoTimeStampRange', () => {
  it('should return true for valid range', () => {
    expect(
      isIsoTimeStampRange({
        since: '2024-01-15T14:30:00Z',
        until: '2024-01-15T16:30:00Z',
      }),
    ).toBe(true);
  });

  it('should return true for same since and until', () => {
    expect(
      isIsoTimeStampRange({
        since: '2024-01-15T14:30:00Z',
        until: '2024-01-15T14:30:00Z',
      }),
    ).toBe(true);
  });

  it('should return true for reverse order (until before since)', () => {
    expect(
      isIsoTimeStampRange({
        since: '2024-01-15T16:30:00Z',
        until: '2024-01-15T14:30:00Z',
      }),
    ).toBe(true);
  });

  it('should return false for date stamps (not timestamps)', () => {
    expect(
      isIsoTimeStampRange({
        since: '2024-01-15',
        until: '2024-01-22',
      }),
    ).toBe(false);
  });

  it('should return false for wrong keys (start/end)', () => {
    expect(
      isIsoTimeStampRange({
        start: '2024-01-15T14:30:00Z',
        end: '2024-01-15T16:30:00Z',
      }),
    ).toBe(false);
  });

  it('should return false for wrong keys (from/to)', () => {
    expect(
      isIsoTimeStampRange({
        from: '2024-01-15T14:30:00Z',
        to: '2024-01-15T16:30:00Z',
      }),
    ).toBe(false);
  });

  it('should return false for null', () => {
    expect(isIsoTimeStampRange(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isIsoTimeStampRange(undefined)).toBe(false);
  });

  it('should return false for string', () => {
    expect(isIsoTimeStampRange('2024-01-15T14:30:00Z')).toBe(false);
  });

  it('should return false for array', () => {
    expect(
      isIsoTimeStampRange(['2024-01-15T14:30:00Z', '2024-01-15T16:30:00Z']),
    ).toBe(false);
  });

  it('should return false for empty object', () => {
    expect(isIsoTimeStampRange({})).toBe(false);
  });

  it('should return false when since is invalid', () => {
    expect(
      isIsoTimeStampRange({
        since: 'invalid',
        until: '2024-01-15T16:30:00Z',
      }),
    ).toBe(false);
  });

  it('should return false when until is invalid', () => {
    expect(
      isIsoTimeStampRange({
        since: '2024-01-15T14:30:00Z',
        until: 'invalid',
      }),
    ).toBe(false);
  });
});
