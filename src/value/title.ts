import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

import * as modelGen from "../model";

import { heading, MockRichTextHeadingValuePattern } from "./richText/heading";

type MockTitleValueConfig<
	Model extends prismicT.CustomTypeModelTitleField = prismicT.CustomTypeModelTitleField,
> = {
	pattern?: MockRichTextHeadingValuePattern;
} & MockValueConfig<Model>;

export const title = (
	config: MockTitleValueConfig = {},
): prismicT.TitleField => {
	const faker = createFaker(config.seed);

	const model =
		config.model ||
		modelGen.title({
			seed: config.seed,
		});

	const pattern =
		config.pattern ||
		faker.random.arrayElement(Object.values(MockRichTextHeadingValuePattern));

	return [
		heading({
			seed: config.seed,
			model,
			pattern,
		}),
	];
};
