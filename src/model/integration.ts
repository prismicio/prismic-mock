import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockIntegrationFieldModelConfig = {
	catalog?: string;
} & MockModelConfig;

export const integration = (
	config: MockIntegrationFieldModelConfig,
): prismic.CustomTypeModelIntegrationField => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.Integration,
		config: {
			label: changeCase.capitalCase(faker.word()),
			catalog: config.catalog || changeCase.snakeCase(faker.words(2)),
		},
	};
};
