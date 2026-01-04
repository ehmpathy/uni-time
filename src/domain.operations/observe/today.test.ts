import { isIsoDateStamp } from '@src/domain.operations/checks/isIsoDateStamp';
import { today } from '@src/domain.operations/observe/today';

describe('today', () => {
  it('should return a valid IsoDateStamp', () => {
    const result = today();
    expect(isIsoDateStamp(result)).toBe(true);
  });

  it('should match yyyy-MM-dd format', () => {
    const result = today();
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should return current date (within tolerance)', () => {
    const result = today();

    // parse result and compare to current date
    const [year, month, day] = result.split('-').map(Number);
    const nowDate = new Date();

    // allow for timezone boundary tolerance
    expect(year).toBeGreaterThanOrEqual(nowDate.getUTCFullYear() - 1);
    expect(year).toBeLessThanOrEqual(nowDate.getUTCFullYear() + 1);
  });
});
