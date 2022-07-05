import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockKeyTextModelConfig = MockModelConfig;

export const keyText = (
	config: MockKeyTextModelConfig,
): prismicT.CustomTypeModelKeyTextField => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.Text,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
		},
	};
};
