import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../../lib/createFaker";

import { MockRichTextValueConfig } from "../../types";

import * as modelGen from "../../model";

type RichTextNodeTitleType =
	| prismicT.RichTextNodeType.heading1
	| prismicT.RichTextNodeType.heading2
	| prismicT.RichTextNodeType.heading3
	| prismicT.RichTextNodeType.heading4
	| prismicT.RichTextNodeType.heading5
	| prismicT.RichTextNodeType.heading6;

type RTHeadingNode =
	| prismicT.RTHeading1Node
	| prismicT.RTHeading2Node
	| prismicT.RTHeading3Node
	| prismicT.RTHeading4Node
	| prismicT.RTHeading5Node
	| prismicT.RTHeading6Node;

const patterns = {
	short: {
		minWords: 1,
		maxWords: 3,
	},
	medium: {
		minWords: 3,
		maxWords: 6,
	},
	long: {
		minWords: 6,
		maxWords: 12,
	},
} as const;

export type MockRichTextHeadingValueConfig = {
	pattern?: keyof typeof patterns;
} & MockRichTextValueConfig;

export const heading = (
	config: MockRichTextHeadingValueConfig = {},
): RTHeadingNode | undefined => {
	const faker = createFaker(config.seed);

	const model = config.model || modelGen.title({ seed: config.seed });

	const types = (
		"single" in model.config ? model.config.single : model.config.multi
	)
		.split(",")
		.filter((type) =>
			[
				"heading1",
				"heading2",
				"heading3",
				"heading4",
				"heading5",
				"heading6",
			].includes(type),
		) as RichTextNodeTitleType[];
	const type = faker.random.arrayElement(types);

	if (type) {
		const patternKey =
			config.pattern ||
			faker.random.arrayElement(
				Object.keys(patterns) as (keyof typeof patterns)[],
			);
		const pattern = patterns[patternKey];

		return {
			type,
			text: changeCase.capitalCase(
				faker.lorem.words(
					faker.datatype.number({
						min: pattern.minWords,
						max: pattern.maxWords,
					}),
				),
			),
			spans: [],
		};
	} else {
		return undefined;
	}
};
