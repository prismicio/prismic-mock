import { createAPIMockFactory, type APIMockFactory } from "./api/createAPIMockFactory"
import { createFaker, type Faker } from "./lib/createFaker"
import { createModelMockFactory, type ModelMockFactory } from "./model/createModelMockFactory"
import type { Seed } from "./types"
import { createValueMockFactory, type ValueMockFactory } from "./value/createValueMockFactory"

export const createMockFactory = (
	...args: ConstructorParameters<typeof MockFactory>
): MockFactory => {
	return new MockFactory(...args)
}

type PrismicMockConfig =
	| {
			seed: Seed
			faker?: never
	  }
	| {
			faker: Faker
			seed?: never
	  }

export class MockFactory {
	private faker: Faker

	api: APIMockFactory
	model: ModelMockFactory
	value: ValueMockFactory

	constructor(config: PrismicMockConfig) {
		this.faker = config.faker || createFaker(config.seed)

		this.api = createAPIMockFactory({ faker: this.faker })
		this.model = createModelMockFactory({ faker: this.faker })
		this.value = createValueMockFactory({ faker: this.faker })
	}

	get seed(): Seed {
		return this.faker.seed
	}
}
