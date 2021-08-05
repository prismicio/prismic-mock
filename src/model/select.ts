import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

type MockSelectModelConfig = {
	optionsCount?: number;
	withDefaultValue?: boolean;
} & MockModelConfig;

export const select = (
	config: MockSelectModelConfig = {},
): prismicT.CustomTypeModelSelectField => {
	const faker = createFaker(config.seed);

	const optionsCount =
		config.optionsCount ?? faker.datatype.number({ min: 1, max: 5 });
	const options = Array(optionsCount)
		.fill(undefined)
		.map(() => changeCase.capitalCase(faker.company.bsBuzz()));

	return {
		type: prismicT.CustomTypeModelFieldType.Select,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			placeholder: changeCase.sentenceCase(faker.lorem.words(3)),
			options,
			default_value: config.withDefaultValue
				? faker.random.arrayElement(options)
				: undefined,
		},
	};
};
