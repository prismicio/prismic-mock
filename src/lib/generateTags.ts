import { capitalCase } from "../lib/changeCase";
import { createFaker, Faker } from "../lib/createFaker";

import { Seed } from "../types";

type GenerateTagsConfig = {
	min?: number;
	max?: number;
} & (
	| {
			seed: Seed;
			faker?: never;
	  }
	| {
			faker: Faker;
			seed?: never;
	  }
);

export const generateTags = (config: GenerateTagsConfig): string[] => {
	const faker = config.faker || createFaker(config.seed);

	return Array.from(
		{ length: faker.range(config.min ?? 0, config.max ?? 2) },
		() => capitalCase(faker.words(faker.range(1, 3))),
	);
};
