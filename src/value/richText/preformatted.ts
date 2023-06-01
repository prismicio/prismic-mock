import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../../lib/createFaker";

import { MockRichTextValueConfig } from "../../types";

const patterns = {
	short: {
		sentenceCount: 2,
	},
	medium: {
		sentenceCount: 6,
	},
	long: {
		sentenceCount: 12,
	},
} as const;

type MockRichTextPreformattedValueConfig = {
	pattern?: keyof typeof patterns;
} & MockRichTextValueConfig;

export const preformatted = (
	config: MockRichTextPreformattedValueConfig,
): prismic.RTPreformattedNode | undefined => {
	const faker = config.faker || createFaker(config.seed);

	const patternKey =
		config.pattern ||
		faker.randomElement(Object.keys(patterns) as (keyof typeof patterns)[]);
	const pattern = patterns[patternKey];

	// TODO: Use code, not lorem ipsum.
	const text = Array.from(
		{ length: pattern.sentenceCount },
		() => changeCase.sentenceCase(faker.words(faker.range(5, 15))) + ".",
	).join(" ");

	return {
		type: prismic.RichTextNodeType.preformatted,
		text,
		spans: [],
	};
};
