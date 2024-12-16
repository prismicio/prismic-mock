import * as prismic from "@prismicio/client";

import { capitalCase } from "../lib/changeCase";
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
			label: capitalCase(faker.word()),
		},
	};
}
