import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockRichTextModelConfig<
	WithMultipleBlocks extends boolean = boolean,
> = {
	withMultipleBlocks?: WithMultipleBlocks;
} & MockModelConfig;

export const richText = <WithMultipleBlocks extends boolean = boolean>(
	config: MockRichTextModelConfig<WithMultipleBlocks>,
): WithMultipleBlocks extends true
	? prismic.CustomTypeModelRichTextMultiField
	: prismic.CustomTypeModelRichTextSingleField => {
	const faker = config.faker || createFaker(config.seed);

	const blockTypes = faker
		.randomElements([
			prismic.RichTextNodeType.heading1,
			prismic.RichTextNodeType.heading2,
			prismic.RichTextNodeType.heading3,
			prismic.RichTextNodeType.heading4,
			prismic.RichTextNodeType.heading5,
			prismic.RichTextNodeType.heading6,
			prismic.RichTextNodeType.paragraph,
			prismic.RichTextNodeType.preformatted,
			prismic.RichTextNodeType.strong,
			prismic.RichTextNodeType.em,
			prismic.RichTextNodeType.listItem,
			prismic.RichTextNodeType.oListItem,
			prismic.RichTextNodeType.image,
			prismic.RichTextNodeType.embed,
			prismic.RichTextNodeType.hyperlink,
		])
		.join(",");

	const blockTypeConfig =
		config.withMultipleBlocks ?? faker.boolean()
			? { multi: blockTypes }
			: { single: blockTypes };

	return {
		type: prismic.CustomTypeModelFieldType.StructuredText,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
			allowTargetBlank: faker.boolean() ? true : undefined,
			...blockTypeConfig,
		},
	} as WithMultipleBlocks extends true
		? prismic.CustomTypeModelRichTextMultiField
		: prismic.CustomTypeModelRichTextSingleField;
};
