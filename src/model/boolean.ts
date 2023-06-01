import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockBooleanModelConfig = MockModelConfig;

export function boolean(
	config: MockBooleanModelConfig,
): prismic.CustomTypeModelBooleanField {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.Boolean,
		config: {
			label: changeCase.capitalCase(faker.word()),
		},
	};
}
