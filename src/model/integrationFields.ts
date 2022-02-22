import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockIntegrationFieldsModelConfig = {
	catalog?: string;
} & MockModelConfig;

export const integrationFields = (
	config: MockIntegrationFieldsModelConfig = {},
): prismicT.CustomTypeModelIntegrationFieldsField => {
	const faker = createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.IntegrationFields,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			catalog: config.catalog || changeCase.snakeCase(faker.lorem.words(4)),
		},
	};
};
