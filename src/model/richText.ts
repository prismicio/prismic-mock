import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockRichTextModelConfig = {
	withMultipleBlocks?: boolean;
} & MockModelConfig;

export const richText = (
	config: MockRichTextModelConfig = {},
): prismicT.CustomTypeModelRichTextField => {
	const faker = createFaker(config.seed);

	const blockTypes = faker.random
		.arrayElements([
			"heading1",
			"heading2",
			"heading3",
			"heading4",
			"heading5",
			"heading6",
			"paragraph",
			"preformatted",
			"strong",
			"em",
			"list-item",
			"o-list-item",
			"image",
			"embed",
			"hyperlink",
		])
		.join(",");

	const blockTypeConfig =
		config.withMultipleBlocks ?? faker.datatype.boolean()
			? { multi: blockTypes }
			: { single: blockTypes };

	return {
		type: prismicT.CustomTypeModelFieldType.StructuredText,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			placeholder: changeCase.sentenceCase(faker.lorem.words(3)),
			allowTargetBlank: faker.datatype.boolean() ? true : undefined,
			...blockTypeConfig,
		},
	} as prismicT.CustomTypeModelRichTextField;
};
