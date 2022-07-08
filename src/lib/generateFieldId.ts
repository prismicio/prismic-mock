import * as changeCase from "change-case";

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

export const generateFieldId = (config: GenerateFieldIdConfig): string => {
	const faker = config.faker || createFaker(config.seed);

	return changeCase.snakeCase(faker.words(faker.range(1, 3)));
};
