import * as prismicT from "@prismicio/types";
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

type MockRichTextParagraphValueConfig = {
	pattern?: keyof typeof patterns;
} & MockRichTextValueConfig;

export const paragraph = (
	config: MockRichTextParagraphValueConfig,
): prismicT.RTParagraphNode | undefined => {
	const faker = config.faker || createFaker(config.seed);

	const patternKey =
		config.pattern ||
		faker.randomElement(Object.keys(patterns) as (keyof typeof patterns)[]);
	const pattern = patterns[patternKey];

	const text = Array.from(
		{ length: pattern.sentenceCount },
		() => changeCase.sentenceCase(faker.words(faker.range(5, 15))) + ".",
	).join(" ");

	return {
		type: prismicT.RichTextNodeType.paragraph,
		text,
		spans: [],
	};
};
