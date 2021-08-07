import * as prismicT from "@prismicio/types";

import { createFaker } from "../../lib/createFaker";

import { MockRichTextValueConfig } from "../../types";

export enum MockRichTextParagraphValuePattern {
	Short = "Short",
	Medium = "Medium",
	Long = "Long",
}

const patternConfigs = {
	[MockRichTextParagraphValuePattern.Short]: {
		sentenceCount: 2,
	},
	[MockRichTextParagraphValuePattern.Medium]: {
		sentenceCount: 6,
	},
	[MockRichTextParagraphValuePattern.Long]: {
		sentenceCount: 12,
	},
};

type MockRichTextParagraphValueConfig = {
	pattern?: MockRichTextParagraphValuePattern;
} & MockRichTextValueConfig;

export const paragraph = (
	config: MockRichTextParagraphValueConfig = {},
): prismicT.RTParagraphNode | undefined => {
	const faker = createFaker(config.seed);

	const pattern =
		config.pattern ||
		faker.random.arrayElement(Object.values(MockRichTextParagraphValuePattern));
	const patternConfig = patternConfigs[pattern];

	return {
		type: prismicT.RichTextNodeType.paragraph,
		text: faker.lorem.paragraph(patternConfig.sentenceCount),
		spans: [],
	};
};
