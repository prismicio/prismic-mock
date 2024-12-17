import * as prismic from "@prismicio/client";

import { capitalCase } from "../../lib/changeCase";
import { createFaker } from "../../lib/createFaker";

import { MockRichTextValueConfig } from "../../types";

import * as modelGen from "../../model";

type RichTextNodeTitleType =
	| typeof prismic.RichTextNodeType.heading1
	| typeof prismic.RichTextNodeType.heading2
	| typeof prismic.RichTextNodeType.heading3
	| typeof prismic.RichTextNodeType.heading4
	| typeof prismic.RichTextNodeType.heading5
	| typeof prismic.RichTextNodeType.heading6;

type RTHeadingNode =
	| prismic.RTHeading1Node
	| prismic.RTHeading2Node
	| prismic.RTHeading3Node
	| prismic.RTHeading4Node
	| prismic.RTHeading5Node
	| prismic.RTHeading6Node;

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

const headingNoteTypes = [
	prismic.RichTextNodeType.heading1,
	prismic.RichTextNodeType.heading2,
	prismic.RichTextNodeType.heading3,
	prismic.RichTextNodeType.heading4,
	prismic.RichTextNodeType.heading5,
	prismic.RichTextNodeType.heading6,
];

export const heading = (
	config: MockRichTextHeadingValueConfig,
): RTHeadingNode | undefined => {
	const faker = config.faker || createFaker(config.seed);

	const model = config.model || modelGen.title({ faker });

	let types: RichTextNodeTitleType[] = [];
	if (model.config) {
		if ("single" in model.config && model.config.single) {
			types = model.config.single
				.split(",")
				.filter((type): type is RichTextNodeTitleType =>
					headingNoteTypes.includes(type as RichTextNodeTitleType),
				);
		} else if ("multi" in model.config && model.config.multi) {
			types = model.config.multi
				.split(",")
				.filter((type): type is RichTextNodeTitleType =>
					headingNoteTypes.includes(type as RichTextNodeTitleType),
				);
		}
	}

	const type = faker.randomElement(types);

	if (type) {
		const patternKey =
			config.pattern ||
			faker.randomElement(Object.keys(patterns) as (keyof typeof patterns)[]);
		const pattern = patterns[patternKey];

		return {
			type,
			text: capitalCase(
				faker.words(faker.range(pattern.minWords, pattern.maxWords)),
			),
			spans: [],
		};
	} else {
		return undefined;
	}
};
