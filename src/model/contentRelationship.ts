import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

type MockContentRelationshipModel<
	CustomTypeIDs extends string = string,
	Tags extends string = string,
	WithText extends boolean = boolean,
> = prismic.CustomTypeModelContentRelationshipField<CustomTypeIDs, Tags> & {
	config: WithText extends true
		? { text: prismic.CustomTypeModelKeyTextField }
		: { text?: undefined };
};

export type MockContentRelationshipModelConfig<
	CustomTypeIDs extends string = string,
	Tags extends string = string,
	WithText extends boolean = boolean,
> = {
	customTypeIDs?: readonly CustomTypeIDs[];
	tags?: readonly Tags[];
	withText?: WithText;
} & MockModelConfig;

export const contentRelationship = <
	CustomTypeIDs extends string,
	Tags extends string,
	WithText extends boolean = boolean,
>(
	config: MockContentRelationshipModelConfig<CustomTypeIDs, Tags, WithText>,
): MockContentRelationshipModel<CustomTypeIDs, Tags, WithText> => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.Link,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
			select: prismic.CustomTypeModelLinkSelectType.Document,
			customtypes: config.customTypeIDs,
			tags: config.tags,
			text: config.withText
				? { type: prismic.CustomTypeModelFieldType.Text }
				: undefined,
		},
	} as MockContentRelationshipModel<CustomTypeIDs, Tags, WithText>;
};
