import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

export const linkToMedia = (): prismicT.CustomTypeModelLinkToMediaField => {
	return {
		type: prismicT.CustomTypeModelFieldType.Link,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			placeholder: changeCase.sentenceCase(faker.lorem.words(3)),
			select: prismicT.CustomTypeModelLinkSelectType.Media,
		},
	};
};
