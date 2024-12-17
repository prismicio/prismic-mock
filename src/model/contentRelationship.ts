import * as prismic from "@prismicio/client";

import { capitalCase, sentenceCase } from "../lib/changeCase";
import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockContentRelationshipModelConfig<
	CustomTypeIDs extends string = string,
	Tags extends string = string,
> = {
	customTypeIDs?: readonly CustomTypeIDs[];
	tags?: readonly Tags[];
} & MockModelConfig;

export const contentRelationship = <
	CustomTypeIDs extends string,
	Tags extends string,
>(
	config: MockContentRelationshipModelConfig<CustomTypeIDs, Tags>,
): prismic.CustomTypeModelContentRelationshipField<CustomTypeIDs, Tags> => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.Link,
		config: {
			label: capitalCase(faker.word()),
			placeholder: sentenceCase(faker.words(3)),
			select: prismic.CustomTypeModelLinkSelectType.Document,
			customtypes: config.customTypeIDs,
			tags: config.tags,
		},
	};
};
