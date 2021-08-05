import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

export const keyText = (): prismicT.CustomTypeModelKeyTextField => {
	return {
		type: prismicT.CustomTypeModelFieldType.Text,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			placeholder: changeCase.sentenceCase(faker.lorem.words(3)),
		},
	};
};
