import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

export const timestamp = (): prismicT.CustomTypeModelTimestampField => {
	return {
		type: prismicT.CustomTypeModelFieldType.Timestamp,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			placeholder: changeCase.sentenceCase(faker.lorem.words(3)),
		},
	};
};
