import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockSelectModelConfig<
	Option extends string = string,
	DefaultOption extends Option = Option,
> = {
	options?: Option[];
	defaultValue?: DefaultOption;
} & MockModelConfig;

export const select = <Option extends string, DefaultOption extends Option>(
	config: MockSelectModelConfig<Option, DefaultOption> = {},
): prismicT.CustomTypeModelSelectField<Option, DefaultOption> => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.Select,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
			options: config.options || [],
			default_value: config.defaultValue || undefined,
		},
	};
};
