/**
 * .what = iso 8601 duration string format
 * .why = enables concise duration literals with compile-time validation
 * .note = no brand needed; template literal union is specific enough
 */

// time-only patterns
type IsoDurationWordsOnlyTime =
  | `PT${number}S`
  | `PT${number}M`
  | `PT${number}H`
  | `PT${number}M${number}S`
  | `PT${number}H${number}S`
  | `PT${number}H${number}M`
  | `PT${number}H${number}M${number}S`
  | `PT${number}.${number}S`
  | `PT${number}H${number}.${number}S`
  | `PT${number}M${number}.${number}S`
  | `PT${number}H${number}M${number}.${number}S`;

// date-only patterns
type IsoDurationWordsOnlyDate =
  | `P${number}Y`
  | `P${number}M`
  | `P${number}W`
  | `P${number}D`
  | `P${number}Y${number}M`
  | `P${number}Y${number}D`
  | `P${number}M${number}D`
  | `P${number}Y${number}M${number}D`
  | `P${number}W${number}D`;

// combined patterns (date + time)
type IsoDurationWordsCombined =
  | `P${number}DT${number}H`
  | `P${number}DT${number}M`
  | `P${number}DT${number}S`
  | `P${number}DT${number}H${number}M`
  | `P${number}DT${number}H${number}S`
  | `P${number}DT${number}M${number}S`
  | `P${number}DT${number}H${number}M${number}S`
  | `P${number}DT${number}H${number}M${number}.${number}S`
  | `P${number}Y${number}M${number}DT${number}H${number}M${number}S`
  | `P${number}Y${number}M${number}DT${number}H${number}M${number}.${number}S`
  | `P${number}YT${number}H`
  | `P${number}YT${number}M`
  | `P${number}YT${number}S`
  | `P${number}Y${number}MT${number}H${number}M`
  | `P${number}Y${number}MT${number}H${number}M${number}S`;

export type IsoDurationWords =
  | IsoDurationWordsOnlyTime
  | IsoDurationWordsOnlyDate
  | IsoDurationWordsCombined;
