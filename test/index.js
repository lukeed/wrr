import test from 'tape';
import wrr from '../src';

test('exports', t => {
	t.is(typeof wrr, 'function', 'exports a function');
	t.end();
});
