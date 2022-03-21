import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockRichTextModelConfig<
	WithMultipleBlocks extends boolean = boolean,
> = {
	withMultipleBlocks?: WithMultipleBlocks;
} & MockModelConfig;

export const richText = <WithMultipleBlocks extends boolean = boolean>(
	config: MockRichTextModelConfig<WithMultipleBlocks> = {},
): WithMultipleBlocks extends true
	? prismicT.CustomTypeModelRichTextMultiField
	: prismicT.CustomTypeModelRichTextSingleField => {
	const faker = config.faker || createFaker(config.seed);

	const blockTypes = faker
		.randomElements([
			prismicT.RichTextNodeType.heading1,
			prismicT.RichTextNodeType.heading2,
			prismicT.RichTextNodeType.heading3,
			prismicT.RichTextNodeType.heading4,
			prismicT.RichTextNodeType.heading5,
			prismicT.RichTextNodeType.heading6,
			prismicT.RichTextNodeType.paragraph,
			prismicT.RichTextNodeType.preformatted,
			prismicT.RichTextNodeType.strong,
			prismicT.RichTextNodeType.em,
			prismicT.RichTextNodeType.listItem,
			prismicT.RichTextNodeType.oListItem,
			prismicT.RichTextNodeType.image,
			prismicT.RichTextNodeType.embed,
			prismicT.RichTextNodeType.hyperlink,
		])
		.join(",");

	const blockTypeConfig =
		config.withMultipleBlocks ?? faker.boolean()
			? { multi: blockTypes }
			: { single: blockTypes };

	return {
		type: prismicT.CustomTypeModelFieldType.StructuredText,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
			allowTargetBlank: faker.boolean() ? true : undefined,
			...blockTypeConfig,
		},
	} as WithMultipleBlocks extends true
		? prismicT.CustomTypeModelRichTextMultiField
		: prismicT.CustomTypeModelRichTextSingleField;
};
