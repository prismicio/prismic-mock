import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockTimestampModelConfig = MockModelConfig;

export const timestamp = (
	config: MockTimestampModelConfig,
): prismicT.CustomTypeModelTimestampField => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.Timestamp,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
		},
	};
};
