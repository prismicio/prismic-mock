import Rand from "rand-seed";

import { Seed } from "../types";
import { FAKER_SEED } from "../constants";
import { lorem, loremWords } from "./lorem";

export const createFaker = (seed: Seed = FAKER_SEED) => {
	const normalizedSeed = seed.toString();

	if (createFaker.cache[normalizedSeed]) {
		return createFaker.cache[normalizedSeed];
	} else {
		const faker = new Faker(normalizedSeed);

		return (createFaker.cache[normalizedSeed] = faker);
	}
};
createFaker.cache = {} as Record<string, Faker>;

const DAY_MS = 1000 * 60 * 60 * 24;
const YEAR_MS = DAY_MS * 365;
const YEAR_2022_MS = 52 * (YEAR_MS + DAY_MS / 4);

export class Faker {
	private rand: Rand;

	constructor(seed: string) {
		this.rand = new Rand(seed);
	}

	boolean(): boolean {
		return this.random() >= 0.5;
	}

	random(): number {
		return this.rand.next();
	}

	randomElement<T>(elements: readonly T[]): T {
		return elements[this.range(0, elements.length)];
	}

	randomElements<T>(elements: readonly T[]): T[] {
		return elements.filter(() => this.boolean());
	}

	range(min: number, max: number): number {
		return Math.floor(this.rangeFloat(Math.ceil(min), Math.floor(max)));
	}

	rangeFloat(min: number, max: number): number {
		return this.random() * (max - min) + min;
	}

	words(length: number, wordOffset = this.range(0, loremWords.length)): string {
		return lorem(`${length}w`, wordOffset);
	}

	word(): string {
		return this.randomElement(loremWords);
	}

	lorem(
		length: Parameters<typeof lorem>[0],
		wordOffset = this.range(0, loremWords.length),
	): string {
		return lorem(length, wordOffset);
	}

	url(): string {
		return `https://${this.word()}.example`;
	}

	hexColor(): string {
		return `#${this.hash(6)}`;
	}

	hash(length: number): string {
		let hash = "";

		for (let i = 0; i < length; i++) {
			const chars = this.boolean() ? "abcdef" : "0123456789";

			hash += chars[this.range(0, chars.length)];
		}

		return hash;
	}

	date(): Date {
		return new Date(YEAR_2022_MS + this.range(-YEAR_MS * 3, YEAR_MS * 3));
	}

	dateAfter(date: Date): Date {
		const timestamp = date.getTime();

		return new Date(this.range(timestamp, timestamp + YEAR_MS * 3));
	}

	dateBefore(date: Date): Date {
		const timestamp = date.getTime();

		return new Date(this.range(timestamp - YEAR_MS * 3, timestamp));
	}

	dateBetween(min: Date, max: Date): Date {
		return new Date(this.range(min.getTime(), max.getTime()));
	}
}
