import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockUIDModelConfig = MockModelConfig;

export const uid = (
	config: MockUIDModelConfig,
): prismicT.CustomTypeModelUIDField => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.UID,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
		},
	};
};
