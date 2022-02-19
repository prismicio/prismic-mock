import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { GroupFieldModelMap, MockModelConfig } from "../types";

type MockGroupModelConfig<Fields extends GroupFieldModelMap> = {
	fields?: Fields;
} & MockModelConfig;

export const group = <Fields extends GroupFieldModelMap>(
	config: MockGroupModelConfig<Fields> = {},
): prismicT.CustomTypeModelGroupField<Fields> => {
	const faker = createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.Group,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			fields: config.fields || ({} as Fields),
		},
	};
};
