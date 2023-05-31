import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockIntegrationFieldsModelConfig = {
	catalog?: string;
} & MockModelConfig;

export const integrationFields = (
	config: MockIntegrationFieldsModelConfig,
): prismic.CustomTypeModelIntegrationFieldsField => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.IntegrationFields,
		config: {
			label: changeCase.capitalCase(faker.word()),
			catalog: config.catalog || changeCase.snakeCase(faker.words(2)),
		},
	};
};
