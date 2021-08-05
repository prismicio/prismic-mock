import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockLinkModelConfig = MockModelConfig;

export const link = (
	config: MockLinkModelConfig = {},
): prismicT.CustomTypeModelLinkField => {
	const faker = createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.Link,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			placeholder: changeCase.sentenceCase(faker.lorem.words(3)),
			select: null,
			allowTargetBlank: faker.datatype.boolean() || undefined,
		},
	};
};
