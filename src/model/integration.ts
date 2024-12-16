import * as prismic from "@prismicio/client";

import { capitalCase, snakeCase } from "../lib/changeCase";
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
			label: capitalCase(faker.word()),
			catalog: config.catalog || snakeCase(faker.words(2)),
		},
	};
};
