import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../../lib/createFaker";

import { MockRichTextValueConfig } from "../../types";

import * as modelGen from "../../model";

type RichTextNodeTitleType =
	| typeof prismicT.RichTextNodeType.heading1
	| typeof prismicT.RichTextNodeType.heading2
	| typeof prismicT.RichTextNodeType.heading3
	| typeof prismicT.RichTextNodeType.heading4
	| typeof prismicT.RichTextNodeType.heading5
	| typeof prismicT.RichTextNodeType.heading6;

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

const headingNoteTypes = [
	prismicT.RichTextNodeType.heading1,
	prismicT.RichTextNodeType.heading2,
	prismicT.RichTextNodeType.heading3,
	prismicT.RichTextNodeType.heading4,
	prismicT.RichTextNodeType.heading5,
	prismicT.RichTextNodeType.heading6,
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
			text: changeCase.capitalCase(
				faker.words(faker.range(pattern.minWords, pattern.maxWords)),
			),
			spans: [],
		};
	} else {
		return undefined;
	}
};
