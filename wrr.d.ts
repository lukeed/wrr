export interface Weighted<T> {
	/** The item's weight (non-decimal) */
	weight: number;
	/** The array item */
	item: T;
}

export type Getter<T> = () => T;

export default function<T>(items: Weighted<T>[]): Getter<T>;
