# wrr [![build status](https://badgen.now.sh/github/status/lukeed/wrr)](https://github.com/lukeed/wrr/actions) [![codecov](https://badgen.now.sh/codecov/c/github/lukeed/wrr)](https://codecov.io/gh/lukeed/wrr)

> A tiny (148B) weighted round robin utility

At its core, a "weighted round robin" (wrr) will skew a list's random selection towards list items that have more _weight_ given to them.<br>This is generally seen in load-balancing contexts, but `wrr` is not at all limited to that scenario.

From the [NGINX glossary](https://www.nginx.com/resources/glossary/round-robin-load-balancing/):

> **Weighted round robin** – A weight is assigned to each server based on criteria chosen by the site administrator; the most commonly used criterion is the server’s traffic‑handling capacity. The higher the weight, the larger the proportion of client requests the server receives. If, for example, server A is assigned a weight of 3 and server B a weight of 1, the load balancer forwards 3 requests to server A for each 1 it sends to server B.

This module exposes three module definitions:

* **ES Module**: `dist/wrr.mjs`
* **CommonJS**: `dist/wrr.js`
* **UMD**: `dist/wrr.min.js`


## Install

```
$ npm install --save wrr
```


## Usage

> Related to the NGINX example above

```js
import wrr from 'wrr';

const servers = [
	// 3x capacity of B; picked 3x more often than B
	{ item: 'Server A', weight: 3 },
	// our "base unit" for comparison
	{ item: 'Server B', weight: 1 },
	// 2x capacity of B; picked 2x more often than B
	{ item: 'Server C', weight: 2 },
];

// Create reusable instance
const toPickServer = wrr(servers);

toPickServer(); //=> 'Server A'
toPickServer(); //=> 'Server C'
toPickServer(); //=> 'Server A'
toPickServer(); //=> 'Server A'
toPickServer(); //=> 'Server A'
toPickServer(); //=> 'Server A'
toPickServer(); //=> 'Server C'
toPickServer(); //=> 'Server A'
toPickServer(); //=> 'Server A'
toPickServer(); //=> 'Server B'
toPickServer(); //=> 'Server C'
toPickServer(); //=> 'Server A'
```


## API

### wrr(items)
Returns: `Function`

Returns the function that should be used to select from your `items`.<br>You should only call `wrr` when your `items` change.

#### items
Type: `Array`

The candidates for selection, each of which must be an object of `Weighted` shape:

```js
interface Weighted<T> {
	/** The item's weight (non-decimal) */
	weight: number;
	/** The array item */
	item: T;
}
```

You can use any rubric for your `weight` value; however, only whole-number integers are allowed.

The `item` key can hold _any_ value you'd like. This is what's returned to you directly.

## License

MIT © [Luke Edwards](https://lukeed.com)
