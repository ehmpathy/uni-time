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
- `IsoDurationWords` = iso 8601 string format with compile-time validation (e.g., `'P1Y'`, `'PT30S'`, `'P1DT2H'`)
- `IsoDurationShape` = structured object format (e.g., `{ years: 1 }`, `{ seconds: 30 }`, `{ days: 1, hours: 2 }`)
- `IsoDuration` = union of both formats — use whichever is more convenient

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

durations can be expressed in two formats:
- **words** = iso 8601 string format (`'P1Y'`, `'PT30S'`, `'P1DT2H30M'`)
- **shape** = structured object format (`{ years: 1 }`, `{ seconds: 30 }`)

note
- `IsoDurationShape` is easier to work with programmatically, so all operations return it by default.
- `IsoDurationWords` can be convenient for inputs but is rarely convenient for manipulation.

### declare durations

```ts
import type { IsoDuration, IsoDurationWords, IsoDurationShape } from 'iso-time';

// string format — concise, readable, compile-time validated
const cacheTtl: IsoDurationWords = 'PT5M';           // 5 minutes
const invoicePeriod: IsoDurationWords = 'P1M';       // 1 month
const trialPeriod: IsoDurationWords = 'P14D';        // 14 days
const sessionTimeout: IsoDurationWords = 'PT30M';   // 30 minutes

// object format — easy to manipulate programmatically
const timeout: IsoDurationShape = { seconds: 30 };
const workday: IsoDurationShape = { hours: 8 };
const sprint: IsoDurationShape = { weeks: 2 };

// union type — accepts either format
const flexible: IsoDuration = 'P1D';                 // string ✓
const alsoFlexible: IsoDuration = { days: 1 };       // object ✓
```

### compile-time validation

`IsoDurationWords` catches invalid iso 8601 strings at compile time:

```ts
import type { IsoDurationWords } from 'iso-time';

// ✅ valid — compiles
const good1: IsoDurationWords = 'P1Y';
const good2: IsoDurationWords = 'PT30S';
const good3: IsoDurationWords = 'P1DT2H30M';

// ❌ invalid — compile error
const bad1: IsoDurationWords = '1 day';              // not iso format
const bad2: IsoDurationWords = 'P';                  // lacks components
const bad3: IsoDurationWords = 'T30S';               // lacks P prefix
const bad4: IsoDurationWords = { days: 1 };          // wrong type (object)
```

### convert to milliseconds

```ts
import { toMilliseconds } from 'iso-time';

// both formats work
toMilliseconds({ hours: 1 });       // 3600000
toMilliseconds('PT1H');             // 3600000
toMilliseconds({ days: 1 });        // 86400000
toMilliseconds('P1D');              // 86400000
```

### date arithmetic

```ts
import { addDuration, subDuration, getDuration } from 'iso-time';

const later = addDuration(asIsoTimeStamp(new Date()), { hours: 2 });
const earlier = subDuration(asIsoTimeStamp(new Date()), { days: 1 });
const earlierStill = subDuration(asIsoTimeStamp(new Date()), 'P3D');

const elapsed = getDuration({
  of: { range: { since: '2024-06-15T10:00:00Z', until: '2024-06-15T12:30:00Z' } },
}); // { hours: 2, minutes: 30 }
```

### sleep

```ts
import { sleep } from 'iso-time';

await sleep('PT5S');
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
    for: IsoDuration;          // { minutes: 15 } or 'PT15M'
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

## equipment rental

type-safe rental periods with compile-time validated durations:

```ts
import type { IsoDurationWords, IsoDuration, IsoDurationShape, IsoTimeStamp } from 'iso-time';
import { addDuration, getDuration, now } from 'iso-time';

// rental options — iso strings validated at compile time
interface RentalOption {
  label: string;
  duration: IsoDurationWords;
  pricePerDay: number;
}

const excavatorRentals: RentalOption[] = [
  { label: 'half day', duration: 'PT4H', pricePerDay: 150 },
  { label: 'full day', duration: 'P1D', pricePerDay: 250 },
  { label: 'weekend', duration: 'P2D', pricePerDay: 200 },
  { label: 'week', duration: 'P7D', pricePerDay: 175 },

  // ❌ compile error — '3 days' is not valid iso 8601
  // { label: 'bad', duration: '3 days', pricePerDay: 180 },
];

// rental agreement with typed durations
interface RentalAgreement {
  equipment: string;
  pickedUpAt: IsoTimeStamp;
  duration: IsoDuration;           // accepts both formats
  gracePeriod: IsoDuration;        // 'PT1H' — 1 hour grace
}

// compute when equipment is due back
const computeDueAt = (input: { agreement: RentalAgreement }): IsoTimeStamp => {
  const dueAt = addDuration(input.agreement.pickedUpAt, input.agreement.duration);
  return addDuration(dueAt, input.agreement.gracePeriod);
};

// check if rental is overdue
const computeOverdueHours = (input: {
  agreement: RentalAgreement;
  returnedAt: IsoTimeStamp;
}): number => {
  const dueAt = computeDueAt({ agreement: input.agreement });
  const overdue = getDuration({
    of: { range: { since: dueAt, until: input.returnedAt } },
    as: 'hours',
  });
  return overdue.hours;
};

// check how much to refund, minus early return fee
const computeRefundDuration = (input: {
  agreement: RentalAgreement;
  returnedAt: IsoTimeStamp;
}): IsoDurationShape => {
  const dueAt = computeDueAt({ agreement: input.agreement });
  const hoursUnused = getDuration({
    of: { range: { since: input.returnedAt, until: dueAt } },
    as: 'hours',
  }).hours;
  const hoursRefundable = hoursUnused * 0.8; // 20% early return fee
  return { hours: hoursRefundable };         // object format — value is computed
};
```

