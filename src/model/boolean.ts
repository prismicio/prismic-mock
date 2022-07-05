import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockBooleanModelConfig = MockModelConfig;

export function boolean(
	config: MockBooleanModelConfig,
): prismicT.CustomTypeModelBooleanField {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.Boolean,
		config: {
			label: changeCase.capitalCase(faker.word()),
		},
	};
}
