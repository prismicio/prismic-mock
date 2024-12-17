import * as prismic from "@prismicio/client";

import { capitalCase, sentenceCase } from "../lib/changeCase";
import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockTimestampModelConfig = MockModelConfig;

export const timestamp = (
	config: MockTimestampModelConfig,
): prismic.CustomTypeModelTimestampField => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.Timestamp,
		config: {
			label: capitalCase(faker.word()),
			placeholder: sentenceCase(faker.words(3)),
		},
	};
};
