import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

export const link = (): prismicT.CustomTypeModelLinkField => {
	return {
		type: prismicT.CustomTypeModelFieldType.Link,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			select: null,
			placeholder: changeCase.sentenceCase(faker.lorem.words(3)),
			allowTargetBlank: faker.datatype.boolean() || undefined,
		},
	};
};
