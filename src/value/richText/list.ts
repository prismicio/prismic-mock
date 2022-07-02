import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../../lib/createFaker";

import { MockRichTextValueConfig } from "../../types";

const patterns = {
	short: {
		minItems: 1,
		maxItems: 3,
	},
	medium: {
		minItems: 3,
		maxItems: 6,
	},
	long: {
		minItems: 6,
		maxItems: 12,
	},
} as const;

type MockRichTextListValueConfig = {
	pattern?: keyof typeof patterns;
} & MockRichTextValueConfig;

export const list = (
	config: MockRichTextListValueConfig = {},
): prismicT.RTListItemNode[] | undefined => {
	const faker = config.faker || createFaker(config.seed);

	const patternKey =
		config.pattern ||
		faker.randomElement(Object.keys(patterns) as (keyof typeof patterns)[]);
	const pattern = patterns[patternKey];

	const itemsCount = faker.range(pattern.minItems, pattern.maxItems);

	return Array(itemsCount)
		.fill(undefined)
		.map(() => {
			return {
				type: prismicT.RichTextNodeType.listItem,
				text: changeCase.sentenceCase(faker.words(faker.range(5, 15))),
				spans: [],
			};
		});
};
