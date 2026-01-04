# rule.require.treeshake-imports

## .what

always import from submodule paths to guarantee tree-shaking for consumers

## .why

- barrel imports (`from 'some-lib'`) rely on consumer's bundler to tree-shake correctly
- not all bundlers handle barrel exports well (especially older webpack configs)
- submodule imports guarantee only the used code ends up in the bundle
- this is especially critical for libraries that others depend on

## .how

```ts
// ⛔ bad — barrel import, tree-shaking depends on consumer's bundler
import { parseISO, format } from 'date-fns';

// ✅ good — submodule imports, guaranteed tree-shaking
import { parseISO } from 'date-fns/parseISO';
import { format } from 'date-fns/format';
```

## .scope

applies to all dependencies where submodule imports are supported:
- `date-fns/*`
- `lodash-es/*`
- `@aws-sdk/*`
- etc

## .future

esm-only packages (like `date-fns@4+`) have better tree-shaking by default. once the ecosystem fully adopts esm and consumers drop commonjs, barrel imports may become safe again. until then, prefer explicit submodule paths for libraries.

## .reference

- [date-fns tree-shaking issues](https://github.com/date-fns/date-fns/issues/2207)
- [date-fns v3 announcement](https://blog.date-fns.org/v3-is-out/)
