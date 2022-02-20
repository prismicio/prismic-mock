import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockEmbedModelConfig = MockModelConfig;

export const embed = (
	config: MockEmbedModelConfig = {},
): prismicT.CustomTypeModelEmbedField => {
	const faker = createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.Embed,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
		},
	};
};
