import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";
import { generateCustomTypeId } from "../lib/generateCustomTypeId";

import { MockModelConfig } from "../types";

export type MockContentRelationshipModelConfig = {
	constrainCustomTypes?: boolean;
	constrainTags?: boolean;
} & MockModelConfig;

export const contentRelationship = (
	config: MockContentRelationshipModelConfig = {},
): prismicT.CustomTypeModelContentRelationshipField => {
	const faker = createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.Link,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			placeholder: changeCase.sentenceCase(faker.lorem.words(3)),
			select: prismicT.CustomTypeModelLinkSelectType.Document,
			customtypes: config.constrainCustomTypes
				? Array(faker.datatype.number({ min: 1, max: 3 }))
						.fill(undefined)
						.map(() => generateCustomTypeId({ seed: config.seed }))
				: undefined,
			tags: config.constrainTags
				? Array(faker.datatype.number({ min: 1, max: 3 }))
						.fill(undefined)
						.map(() =>
							changeCase.capitalCase(
								faker.lorem.words(faker.datatype.number({ min: 1, max: 3 })),
							),
						)
				: undefined,
		},
	};
};
