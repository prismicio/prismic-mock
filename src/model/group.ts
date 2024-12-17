import * as prismic from "@prismicio/client";

import { capitalCase } from "../lib/changeCase";
import { createFaker } from "../lib/createFaker";

import { GroupFieldModelMap, MockModelConfig } from "../types";

export type MockGroupModelConfig<Fields extends GroupFieldModelMap> = {
	fields?: Fields;
} & MockModelConfig;

export function group<Fields extends GroupFieldModelMap>(
	config: MockGroupModelConfig<Fields>,
): prismic.CustomTypeModelGroupField<Fields> {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.Group,
		config: {
			label: capitalCase(faker.word()),
			fields: config.fields || ({} as Fields),
		},
	};
}
