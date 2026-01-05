# iso-time

![test](https://github.com/ehmpathy/iso-time/workflows/test/badge.svg)
![publish](https://github.com/ehmpathy/iso-time/workflows/publish/badge.svg)

A glossary of intuitive, universally unambiguous time, date, and duration domain literals.

# purpose

declare a universally unambiguous serialization format for dates, times, and datetimes via strict ISO 8601 types with runtime validation.

the core insight: time types are either **stamps** or **floats**
- **stamp** = absolute instant in history (anchored to a specific point in time)
- **float** = detached time pattern (unanchored, could refer to many instants)

etymology:
- `Stamp` — matches PostgreSQL `timestamp` semantics; a time "stamped" into history
- `Float` — a time that floats, not anchored; could land on many different instants

usecases:
- clarify the format a date string should be in (`const since: IsoDateStamp = '2024-12-15'`)
- cast inputs to strict iso format (`const birthday: IsoDateStamp = asIsoDateStamp(new Date())`)
- narrow type of strings with runtime validation (`if (!isIsoDateStamp(since)) throw new Error('wrong format')`)

# types

**stamps** (absolute instants)
- `IsoTimeStamp` = `yyyy-MM-ddTHH:mm:ssZ` (e.g., `2024-06-15T14:30:00Z`)
- `IsoDateStamp` = `yyyy-MM-dd` (e.g., `2024-06-15`)
- `IsoMonthStamp` = `yyyy-MM` (e.g., `2024-06`)
- `IsoYearStamp` = `yyyy` (e.g., `2024`)

**floats** (detached patterns)
- `IsoTimeFloat` = `HH:mm:ss` (e.g., `14:30:00`)
- `IsoHourFloat` = `HH` (e.g., `14`)
- `IsoMinuteFloat` = `mm` (e.g., `30`)
- `IsoMonthFloat` = `MM` (e.g., `06`)
- `IsoDayFloat` = `dd` (e.g., `15`)
- `IsoWeekdayFloat` = `i` (e.g., `1` for Monday)

**ranges** (time spans)
- `IsoTimeStampRange` = `{ since: IsoTimeStamp; until: IsoTimeStamp }`
- `IsoDateStampRange` = `{ since: IsoDateStamp; until: IsoDateStamp }`

**durations** (time quantities)
- `IsoDuration` = `{ years?, months?, weeks?, days?, hours?, minutes?, seconds?, milliseconds? }`

# install

```sh
npm install iso-time
```

# use

## stamps

### cast to strict iso format

```ts
import { asIsoTimeStamp, asIsoDateStamp } from 'iso-time';

const timestamp = asIsoTimeStamp(new Date()); // '2024-06-15T14:30:00Z'
const datestamp = asIsoDateStamp(new Date()); // '2024-06-15'
```

### validate format

```ts
import { isIsoTimeStamp, isIsoDateStamp } from 'iso-time';

isIsoTimeStamp('2024-06-15T14:30:00Z'); // true
isIsoTimeStamp('2024-06-15'); // false

isIsoDateStamp('2024-06-15'); // true
isIsoDateStamp('06/15/2024'); // false
```

### type declarations

```ts
import type { IsoTimeStamp, IsoDateStamp } from 'iso-time';

const occurredAt: IsoTimeStamp = asIsoTimeStamp(new Date());
const birthday: IsoDateStamp = asIsoDateStamp('1990-01-15');
```

## floats

### extract time components

```ts
import { asIsoHourFloat, asIsoMinuteFloat, asIsoWeekdayFloat } from 'iso-time';

const hour = asIsoHourFloat(new Date()); // '14'
const minute = asIsoMinuteFloat(new Date()); // '30'
const weekday = asIsoWeekdayFloat(new Date()); // '1' (Monday)
```

## ranges

### create time ranges

```ts
import { asIsoTimeStampRange, asIsoDateStampRange } from 'iso-time';

const standup = asIsoTimeStampRange({
  since: new Date('2024-06-15T10:00:00Z'),
  until: new Date('2024-06-15T11:00:00Z'),
});

const vacation = asIsoDateStampRange({
  since: new Date('2024-07-01'),
  until: new Date('2024-07-14'),
});
```

## durations

### declare durations

```ts
import type { IsoDuration } from 'iso-time';

const timeout: IsoDuration = { seconds: 30 };
const workday: IsoDuration = { hours: 8 };
const sprint: IsoDuration = { weeks: 2 };
```

### convert to milliseconds

```ts
import { toMilliseconds } from 'iso-time';

toMilliseconds({ hours: 1 }); // 3600000
toMilliseconds({ days: 1 }); // 86400000
```

### date arithmetic

```ts
import { addDuration, subDuration, getDuration } from 'iso-time';

const later = addDuration(asIsoTimeStamp(new Date()), { hours: 2 });
const earlier = subDuration(asIsoTimeStamp(new Date()), { days: 1 });

const elapsed = getDuration({
  of: { range: { since: '2024-06-15T10:00:00Z', until: '2024-06-15T12:30:00Z' } },
}); // { hours: 2, minutes: 30 }
```

### sleep

```ts
import { sleep } from 'iso-time';

await sleep({ seconds: 5 });
await sleep({ milliseconds: 100 });
```

## observe

### current

```ts
import { now, today } from 'iso-time';

const timestamp = now(); // '2024-06-15T14:30:00Z'
const datestamp = today(); // '2024-06-15'
```

### stopwatch

```ts
import { startDurationStopwatch } from 'iso-time';

const stopwatch = startDurationStopwatch({ for: 'api call' }, { log: console });
await fetchData();
const { duration } = stopwatch.stop(); // logs elapsed time
```

# examples

## event schedule system

```ts
import type {
  IsoTimeStamp, IsoDateStamp, IsoTimeFloat,
  IsoWeekdayFloat, IsoDuration
} from 'iso-time';

// when exactly the event occurs (absolute)
interface ScheduledEvent {
  createdAt: IsoTimeStamp;     // '2024-01-15T14:30:00Z'
  occursOn: IsoDateStamp;      // '2024-03-20'
}

// detached schedule pattern (float)
interface DailySchedule {
  since: IsoTimeFloat;         // '09:00:00' - every day at 9am
  until: IsoTimeFloat;         // '10:00:00'
}

// scheduled standup with date range and weekday pattern
interface ScheduledStandup {
  repeats: {
    since: IsoDateStamp;       // '2024-01-15' - start date
    until: IsoDateStamp;       // '2024-12-31' - end date
  };
  occurs: {
    days: IsoWeekdayFloat[];   // ['1', '3', '5'] - mon, wed, fri
    at: IsoTimeFloat;          // '09:00:00'
    for: IsoDuration;          // { minutes: 15 }
  };
}
```

## invoice system

```ts
import type { IsoMonthStamp, IsoDayFloat, IsoMonthFloat } from 'iso-time';

// bill period (absolute)
interface Invoice {
  period: IsoMonthStamp;  // '2024-01' - January 2024 invoice
}

// bill schedule (float)
interface BillSchedule {
  dueOn: IsoDayFloat;             // '15' - due on 15th of each month
  renewsOn: IsoMonthFloat;        // '01' - annual renewal in January
}
```

