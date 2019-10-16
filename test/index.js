import test from 'tape';
import wrr from '../src';

test('exports', t => {
	t.is(typeof wrr, 'function', 'exports a function');
	t.end();
});

test('usage', t => {
	const input = [
		{ weight: 3, item: 'hello' },
		{ weight: 2, item: 'world' },
		{ weight: 1, item: 'there' },
	];

	const picker = wrr(input);
	t.is(typeof picker, 'function', 'returns a function');

	const foo = picker();
	const values = input.map(x => x.item);
	t.true(values.includes(foo), '~> picks a single array item');

	const picks = Array.from({ length: 10 }, picker);
	const bool = picks.every(x => x === picks[0]);
	t.false(bool, '~> does not always pick same item');

	t.end();
});

test('distribution', t => {
	const picker = wrr([
		{ weight: 6, item: 'hello' },
		{ weight: 2, item: 'world' },
		{ weight: 1, item: 'there' },
	]);

	const counts = {
		hello: 0,
		world: 0,
		there: 0,
	};

	Array.from({ length: 500 }, () => {
		let key = picker();
		counts[key]++;
	});

	console.log(counts);

	t.true(
		Math.ceil(counts.hello / counts.there) >= 6,
		'picked "hello" about 6x more often than "there"'
	);

	t.true(
		Math.ceil(counts.world / counts.there) >= 2,
		'picked "world" about 2x more often than "there"'
	);

	t.end();
});
