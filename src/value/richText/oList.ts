import * as prismicT from "@prismicio/types";

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

type MockRichTextOListValueConfig = {
	pattern?: keyof typeof patterns;
} & MockRichTextValueConfig;

export const oList = (
	config: MockRichTextOListValueConfig = {},
): prismicT.RTOListItemNode[] | undefined => {
	const faker = createFaker(config.seed);

	const patternKey =
		config.pattern ||
		faker.random.arrayElement(
			Object.keys(patterns) as (keyof typeof patterns)[],
		);
	const pattern = patterns[patternKey];

	const itemsCount = faker.datatype.number({
		min: pattern.minItems,
		max: pattern.maxItems,
	});

	return Array(itemsCount)
		.fill(undefined)
		.map(() => {
			return {
				type: prismicT.RichTextNodeType.oListItem,
				text: faker.lorem.sentence(),
				spans: [],
			};
		});
};
