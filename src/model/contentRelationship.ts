import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { LinkText } from "./link";
import { MockModelConfig } from "../types";

type MockContentRelationshipModel<
	CustomTypeIDs extends string = string,
	Tags extends string = string,
	Text extends boolean = boolean,
> = prismic.CustomTypeModelContentRelationshipField<CustomTypeIDs, Tags> & {
	config: Text extends true
		? {
				text: LinkText;
			}
		: {
				text?: undefined;
			};
};

export type MockContentRelationshipModelConfig<
	CustomTypeIDs extends string = string,
	Tags extends string = string,
	Text extends boolean = boolean,
> = {
	customTypeIDs?: readonly CustomTypeIDs[];
	tags?: readonly Tags[];
	text?: Text;
} & MockModelConfig;

export const contentRelationship = <
	CustomTypeIDs extends string,
	Tags extends string,
	Text extends boolean = boolean,
>(
	config: MockContentRelationshipModelConfig<CustomTypeIDs, Tags, Text>,
): MockContentRelationshipModel<CustomTypeIDs, Tags, Text> => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.Link,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
			select: prismic.CustomTypeModelLinkSelectType.Document,
			customtypes: config.customTypeIDs,
			tags: config.tags,
			text: config.text
				? {
						type: prismic.CustomTypeModelFieldType.Text,
					}
				: undefined,
		},
	} as MockContentRelationshipModel<CustomTypeIDs, Tags, Text>;
};
