import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

type GenerateTagsConfig = {
	min?: number;
	max?: number;
} & Pick<MockValueConfig, "faker" | "seed">;

export const generateTags = (config: GenerateTagsConfig): string[] => {
	const faker = config.faker || createFaker(config.seed);

	return Array.from(
		{ length: faker.range(config.min ?? 0, config.max ?? 2) },
		() => changeCase.capitalCase(faker.words(faker.range(1, 3))),
	);
};
