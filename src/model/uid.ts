import * as prismic from "@prismicio/client";

import { capitalCase, sentenceCase } from "../lib/changeCase";
import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockUIDModelConfig = MockModelConfig;

export const uid = (
	config: MockUIDModelConfig,
): prismic.CustomTypeModelUIDField => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.UID,
		config: {
			label: capitalCase(faker.word()),
			placeholder: sentenceCase(faker.words(3)),
		},
	};
};
