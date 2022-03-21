import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { GroupFieldModelMap, MockModelConfig } from "../types";

export type MockGroupModelConfig<Fields extends GroupFieldModelMap> = {
	fields?: Fields;
} & MockModelConfig;

export function group<Fields extends GroupFieldModelMap>(
	config: MockGroupModelConfig<Fields> = {},
): prismicT.CustomTypeModelGroupField<Fields> {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.Group,
		config: {
			label: changeCase.capitalCase(faker.word()),
			fields: config.fields || ({} as Fields),
		},
	};
}
