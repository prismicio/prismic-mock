import * as prismic from "@prismicio/client";

import { capitalCase, sentenceCase } from "../lib/changeCase";
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
	config: MockSelectModelConfig<Option, DefaultOption>,
): prismic.CustomTypeModelSelectField<Option, DefaultOption> => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.Select,
		config: {
			label: capitalCase(faker.word()),
			placeholder: sentenceCase(faker.words(3)),
			options: config.options || [],
			default_value: config.defaultValue || undefined,
		},
	};
};
