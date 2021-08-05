import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

export const number = (): prismicT.CustomTypeModelNumberField => {
	return {
		type: prismicT.CustomTypeModelFieldType.Number,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			placeholder: changeCase.sentenceCase(faker.lorem.words(3)),
		},
	};
};
