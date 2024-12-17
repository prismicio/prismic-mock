import * as prismic from "@prismicio/client";

import { capitalCase, sentenceCase } from "../lib/changeCase";
import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockTitleModelConfig = MockModelConfig;

export const title = (
	config: MockTitleModelConfig,
): prismic.CustomTypeModelTitleField => {
	const faker = config.faker || createFaker(config.seed);

	const single = faker
		.randomElements([
			"heading1",
			"heading2",
			"heading3",
			"heading4",
			"heading5",
			"heading6",
		])
		.join(",");

	return {
		type: prismic.CustomTypeModelFieldType.StructuredText,
		config: {
			label: capitalCase(faker.word()),
			placeholder: sentenceCase(faker.words(3)),
			single,
			allowTargetBlank: faker.boolean() || undefined,
		},
	};
};
