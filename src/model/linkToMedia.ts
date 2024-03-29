import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockLinkToMediaModelConfig = MockModelConfig;

export const linkToMedia = (
	config: MockLinkToMediaModelConfig,
): prismic.CustomTypeModelLinkToMediaField => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.Link,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
			select: prismic.CustomTypeModelLinkSelectType.Media,
		},
	};
};
