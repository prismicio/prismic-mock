import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockLinkTomediaModelConfig = MockModelConfig;

export const linkToMedia = (
	config: MockLinkTomediaModelConfig = {},
): prismicT.CustomTypeModelLinkToMediaField => {
	const faker = createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.Link,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			placeholder: changeCase.sentenceCase(faker.lorem.words(3)),
			select: prismicT.CustomTypeModelLinkSelectType.Media,
		},
	};
};
