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

type MockRichTextPreformattedValueConfig = {
	pattern?: keyof typeof patterns;
} & MockRichTextValueConfig;

export const preformatted = (
	config: MockRichTextPreformattedValueConfig = {},
): prismicT.RTPreformattedNode | undefined => {
	const faker = createFaker(config.seed);

	const patternKey =
		config.pattern ||
		faker.random.arrayElement(
			Object.keys(patterns) as (keyof typeof patterns)[],
		);
	const pattern = patterns[patternKey];

	return {
		type: prismicT.RichTextNodeType.preformatted,
		// TODO: Use code, not lorem ipsum.
		text: faker.lorem.paragraph(pattern.sentenceCount),
		spans: [],
	};
};
