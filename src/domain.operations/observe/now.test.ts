import { isIsoTimeStamp } from '@src/domain.operations/checks/isIsoTimeStamp';
import { now } from '@src/domain.operations/observe/now';

describe('now', () => {
  it('should return a valid IsoTimeStamp', () => {
    const result = now();
    expect(isIsoTimeStamp(result)).toBe(true);
  });

  it('should end with Z (UTC)', () => {
    const result = now();
    expect(result.endsWith('Z')).toBe(true);
  });

  it('should match yyyy-MM-ddTHH:mm:ssZ format', () => {
    const result = now();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
  });

  it('should return current time (within tolerance)', () => {
    const before = Date.now();
    const result = now();
    const after = Date.now();

    const resultMs = new Date(result).getTime();
    expect(resultMs).toBeGreaterThanOrEqual(before - 1000);
    expect(resultMs).toBeLessThanOrEqual(after + 1000);
  });
});
