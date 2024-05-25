# uni-time

![test](https://github.com/uladkasach/uni-time/workflows/test/badge.svg)
![publish](https://github.com/uladkasach/uni-time/workflows/publish/badge.svg)

A glossary of intuitive, universally unambiguous time, date, and duration domain literals.

# purpose

declare a universally unambiguous serialization format for dates, times, and datetime
- `UniDate` = `yyyy-MM-dd`
- `UniTime` = `hh:mm:ss.sss`
- `UniDateTime` = `yyyy-MM-ddThh:mm:ss.sssZ`

declare a universally intuitive interface for durations
- `UniDuration`

usecases
- clarify the format a date string should be in (`const since: UniDate = '2013-12-15`)
- cast date to universal format (`const birthday: UniDate = toUniDate(new Date())`)
- narrow type of strings with runtime validation (`if (!isUniDate(since)) throw new Error('wrong format')`)


# install

```sh
npm install uni-time
```

# use

## Time, Date, DateTime

### declare that a date or datetime must be in the universal format

```ts
const noon: UniTime;
const birthday: UniDate;
const occurredAt: UniDateTime;
```


### assure that a date or datetime is in the universal format

```ts
const noon: UniTime = isUniTime.assure('12:00:00.000')
const birthday: UniDate = isUniDate.assure('2013-12-15')
const occurredAt: UniDateTime = isUniDate.assure('2013-12-15T07:21:13.555Z')
```


### cast a date or datetime into the universal format

```ts
const birthday: UniDate = asUniDate(new Date())
const occurredAt: UniDateTime = asUniDateTime(new Date())
```


## Duration

### declare a duration intuitively
```ts
const duration: UniDuration = { minutes: 7 }
```

### serialize to milliseconds
```ts
const durationInMs = toMilliseconds({ minutes: 7 })
```

### sleep
```ts
await sleep({ minutes: 7 })
```
