import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

export const boolean = (): prismicT.CustomTypeModelBooleanField => {
	return {
		type: prismicT.CustomTypeModelFieldType.Boolean,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
		},
	};
};
