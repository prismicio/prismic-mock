import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

type GenerateFieldIdConfig = Pick<MockModelConfig, "faker" | "seed">;

export const generateFieldId = (config: GenerateFieldIdConfig): string => {
	const faker = config.faker || createFaker(config.seed);

	return changeCase.snakeCase(faker.words(faker.range(1, 3)));
};
