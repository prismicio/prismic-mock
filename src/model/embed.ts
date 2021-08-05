import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

export const embed = (): prismicT.CustomTypeModelEmbedField => {
	return {
		type: prismicT.CustomTypeModelFieldType.Embed,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			placeholder: changeCase.sentenceCase(faker.lorem.words(3)),
		},
	};
};
