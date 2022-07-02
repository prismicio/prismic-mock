import { createFaker, Faker } from "./lib/createFaker";

import { Seed } from "./types";

import {
	createModelMockFactory,
	ModelMockFactory,
} from "./model/createModelMockFactory";
import {
	createValueMockFactory,
	ValueMockFactory,
} from "./value/createValueMockFactory";
import {
	createAPIMockFactory,
	APIMockFactory,
} from "./api/createAPIMockFactory";

export const createMockFactory = (
	...args: ConstructorParameters<typeof MockFactory>
): MockFactory => {
	return new MockFactory(...args);
};

type PrismicMockConfig = {
	seed?: Seed;
};

export class MockFactory {
	private faker: Faker;

	api: APIMockFactory;
	model: ModelMockFactory;
	value: ValueMockFactory;

	constructor(config: PrismicMockConfig = {}) {
		this.faker = createFaker(config.seed);

		this.api = createAPIMockFactory({ faker: this.faker });
		this.model = createModelMockFactory({ faker: this.faker });
		this.value = createValueMockFactory({ faker: this.faker });
	}

	get seed() {
		return this.faker.seed;
	}
}
