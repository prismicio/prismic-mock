import * as prismic from "@prismicio/client";

import { capitalCase } from "../lib/changeCase";
import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockTableModelConfig = MockModelConfig;

export const table = (
	config: MockTableModelConfig,
): prismic.CustomTypeModelTableField => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.Table,
		config: {
			label: capitalCase(faker.word()),
		},
	};
};
