import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

type GenerateFieldIdConfig = Pick<MockModelConfig, "seed">;

export const generateFieldId = (config: GenerateFieldIdConfig): string => {
	const faker = createFaker(config.seed);

	return changeCase.snakeCase(faker.words(faker.range(1, 3)));
};
