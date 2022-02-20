import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockDateModelConfig = MockModelConfig;

export const date = (
	config: MockDateModelConfig = {},
): prismicT.CustomTypeModelDateField => {
	const faker = createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.Date,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
		},
	};
};
