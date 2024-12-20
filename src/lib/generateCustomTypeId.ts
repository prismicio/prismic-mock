import { snakeCase } from "../lib/changeCase";
import { createFaker, Faker } from "../lib/createFaker";

import { Seed } from "../types";

type GenerateFieldIdConfig =
	| {
			seed: Seed;
			faker?: never;
	  }
	| {
			faker: Faker;
			seed?: never;
	  };

export const generateCustomTypeId = (config: GenerateFieldIdConfig): string => {
	const faker = config.faker || createFaker(config.seed);

	return snakeCase(faker.words(faker.range(1, 3)));
};
