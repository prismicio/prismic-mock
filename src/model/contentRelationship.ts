import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

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
): prismicT.CustomTypeModelContentRelationshipField<CustomTypeIDs, Tags> => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.Link,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
			select: prismicT.CustomTypeModelLinkSelectType.Document,
			customtypes: config.customTypeIDs,
			tags: config.tags,
		},
	};
};
