import { snakeCase } from "../lib/changeCase"
import { createFaker, type Faker } from "../lib/createFaker"
import type { Seed } from "../types"

type GenerateFieldIdConfig =
	| {
			seed: Seed
			faker?: never
	  }
	| {
			faker: Faker
			seed?: never
	  }

export const generateFieldId = (config: GenerateFieldIdConfig): string => {
	const faker = config.faker || createFaker(config.seed)

	return snakeCase(faker.words(faker.range(1, 3)))
}
