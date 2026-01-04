import { asUniDate } from '@src/domain.operations/checks/isUniDate';
import { asUniDateRange } from '@src/domain.operations/checks/isUniDateRange';
import { asUniDateTime } from '@src/domain.operations/checks/isUniDateTime';
import { asUniDateTimeRange } from '@src/domain.operations/checks/isUniDateTimeRange';

import type {
  UniDate,
  UniDateRange,
  UniDateTime,
  UniDateTimeRange,
} from './UniDateTime';

describe('UniDateTime', () => {
  describe('declaration', () => {
    describe('instants', () => {
      test('a UniDate should be usable', () => {
        const date = asUniDate(new Date());
        const isString: string = date;
        expect(isString);
        const isSelfAssignable: UniDate = date;
        expect(isSelfAssignable);
      });
      test('a UniDateTime should be usable', () => {
        const time = asUniDateTime(new Date());
        const isString: string = time;
        expect(isString);
        const isSelfAssignable: UniDate = time;
        expect(isSelfAssignable);
      });
    });
    describe('ranges', () => {
      test('a UniDateRange should be usable', () => {
        const range = asUniDateRange({
          since: asUniDateTime(new Date()),
          until: asUniDateTime(new Date()),
        });
        const isString: string = range.since;
        expect(isString);
      });
      test('a UniDateTimeRange should be usable', () => {
        const range = asUniDateTimeRange({
          since: asUniDateTime(new Date()),
          until: asUniDateTime(new Date()),
        });
        const isString: string = range.until;
        expect(isString);
      });
    });
  });
  describe('composition', () => {
    describe('instants', () => {
      test('a UniDateTime should be assignable to a UniDate, because it is more precise', () => {
        const date: UniDate = asUniDateTime(new Date());
        expect(date);
      });
      test('a UniDate should NOT be assignable to a UniDateTime, because it is less precise', () => {
        // @ts-expect-error; UniDate should not be assignable UniDateTime
        const time: UniDateTime = asUniDate(new Date());
        expect(time);
      });
    });
    describe('ranges', () => {
      test('a UniDateTimeRange should be assignable to a UniDateTime, because it is more precice', () => {
        const range: UniDateRange = asUniDateTimeRange({
          since: asUniDateTime(new Date()),
          until: asUniDateTime(new Date()),
        });
        expect(range);
      });
      test('a UniDateRange should NOT be assignable to a UniDateTimeRange, because it is less precise', () => {
        // @ts-expect-error; UniDateRange should not be assignable UniDateTimeRange
        const range: UniDateTimeRange = asUniDateRange({
          since: asUniDateTime(new Date()),
          until: asUniDateTime(new Date()),
        });
        expect(range);
      });
    });
  });
});
