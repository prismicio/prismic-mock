import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

type GenerateTagsConfig = Pick<MockValueConfig, "seed">;

export const generateTags = (config: GenerateTagsConfig): string[] => {
	const faker = createFaker(config.seed);

	return Array(faker.datatype.number(2))
		.fill(undefined)
		.map(() =>
			changeCase.capitalCase(
				faker.lorem.words(faker.datatype.number({ min: 1, max: 3 })),
			),
		);
};
