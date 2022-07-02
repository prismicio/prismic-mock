import { createFaker, Faker } from "./lib/createFaker";

import { Seed } from "./types";

import { createModelFactory, ModelFactory } from "./model/createModelFactory";

export const createMockInstance = (seed?: Seed): PrismicMock => {
	return new PrismicMock({ seed });
};

type PrismicMockConfig = {
	seed?: Seed;
};

export class PrismicMock {
	private faker: Faker;

	model: ModelFactory;

	constructor({ seed }: PrismicMockConfig) {
		this.faker = createFaker(seed);

		this.model = createModelFactory({ faker: this.faker });
	}
}
