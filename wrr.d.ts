export interface Weighted<T> {
	/** The item's weight (non-decimal) */
	weight: number;
	/** The array item */
	item: T;
}

export type Picker<T> = () => T;

export default function wrr<T>(items: Weighted<T>[]): Picker<T>;
