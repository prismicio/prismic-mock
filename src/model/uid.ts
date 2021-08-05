import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

export const uid = (): prismicT.CustomTypeModelUIDField => {
	return {
		type: prismicT.CustomTypeModelFieldType.UID,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			placeholder: changeCase.sentenceCase(faker.lorem.words(3)),
		},
	};
};
