import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

type GenerateTagsConfig = {
	min?: number;
	max?: number;
} & Pick<MockValueConfig, "seed">;

export const generateTags = (config: GenerateTagsConfig): string[] => {
	const faker = createFaker(config.seed);

	return Array(
		faker.datatype.number({
			min: config.min ?? 0,
			max: config.max ?? 2,
		}),
	)
		.fill(undefined)
		.map(() =>
			changeCase.capitalCase(
				faker.lorem.words(faker.datatype.number({ min: 1, max: 3 })),
			),
		);
};
