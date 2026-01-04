import type { LogLevel } from 'simple-leveled-log-methods';
import { given, then, when } from 'test-fns';

import { startDurationStopwatch } from '@src/domain.operations/observe/stopwatch/startDurationStopwatch';
import { sleep } from '@src/domain.operations/utils/sleep';

describe('startDurationStopwatch integration', () => {
  given('a stopwatch for timing operations', () => {
    when('timing a sleep operation', () => {
      then('should measure approximately correct duration', async () => {
        const context = { log: console };
        const stopwatch = startDurationStopwatch(
          { for: 'sleep test', log: false },
          context,
        );

        await sleep(50);

        const result = stopwatch.stop();

        // allow for some variance in timing
        expect(result.duration.milliseconds).toBeGreaterThanOrEqual(45);
        expect(result.duration.milliseconds).toBeLessThan(150);
      });
    });

    when('timing with IsoDuration input for sleep', () => {
      then('should work with duration objects', async () => {
        const context = { log: console };
        const stopwatch = startDurationStopwatch(
          { for: 'isoduration sleep test', log: false },
          context,
        );

        await sleep({ milliseconds: 30 });

        const result = stopwatch.stop();

        expect(result.duration.milliseconds).toBeGreaterThanOrEqual(25);
        expect(result.duration.milliseconds).toBeLessThan(150);
      });
    });
  });

  given('a stopwatch with logging options', () => {
    when('duration exceeds threshold', () => {
      then('should return duration object with correct shape', async () => {
        const logs: string[] = [];
        const context = {
          log: {
            debug: (msg: string) => logs.push(msg),
            info: (msg: string) => logs.push(msg),
            warn: (msg: string) => logs.push(msg),
            error: (msg: string) => logs.push(msg),
          },
        };

        const stopwatch = startDurationStopwatch(
          {
            for: 'threshold test',
            log: {
              threshold: { milliseconds: 10 },
              level: 'debug' as LogLevel,
            },
          },
          context,
        );

        await sleep(50);

        const result = stopwatch.stop();

        expect(result.duration.milliseconds).toBeGreaterThan(10);
        expect(logs.length).toBeGreaterThan(0);
        expect(logs[0]).toContain('threshold test');
      });
    });

    when('duration is below threshold', () => {
      then('should not log', async () => {
        const logs: string[] = [];
        const context = {
          log: {
            debug: (msg: string) => logs.push(msg),
            info: (msg: string) => logs.push(msg),
            warn: (msg: string) => logs.push(msg),
            error: (msg: string) => logs.push(msg),
          },
        };

        const stopwatch = startDurationStopwatch(
          {
            for: 'below threshold test',
            log: { threshold: { seconds: 10 } },
          },
          context,
        );

        await sleep(5);

        stopwatch.stop();

        expect(logs.length).toEqual(0);
      });
    });
  });
});
