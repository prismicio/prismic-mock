import * as prismicT from "@prismicio/types";

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
	config: MockRichTextParagraphValueConfig = {},
): prismicT.RTParagraphNode | undefined => {
	const faker = createFaker(config.seed);

	const patternKey =
		config.pattern ||
		faker.random.arrayElement(
			Object.keys(patterns) as (keyof typeof patterns)[],
		);
	const pattern = patterns[patternKey];

	return {
		type: prismicT.RichTextNodeType.paragraph,
		text: faker.lorem.paragraph(pattern.sentenceCount),
		spans: [],
	};
};