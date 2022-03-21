import { createFaker, Faker } from "./lib/createFaker";
import { Seed } from "./types";

type PrismicMockConfig = {
	seed: Seed;
};

export class PrismicMock {
	faker = Faker;

	constructor({ seed }: PrismicMockConfig) {
		this.faker = createFaker(seed);
	}
}
