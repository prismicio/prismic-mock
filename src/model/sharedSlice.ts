import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockSharedSliceModelConfig<
	Variation extends prismic.SharedSliceModelVariation,
> = {
	id?: string;
	name?: string;
	variations?: Variation[];
} & MockModelConfig;

export const sharedSlice = <
	Variation extends prismic.SharedSliceModelVariation,
>(
	config: MockSharedSliceModelConfig<Variation>,
): prismic.SharedSliceModel<string, Variation> => {
	const faker = config.faker || createFaker(config.seed);

	let name: string =
		config.name || changeCase.capitalCase(faker.words(faker.range(1, 2)));
	let id: string = config.id || changeCase.snakeCase(name);

	if (config.id && !config.name) {
		name = changeCase.pascalCase(config.id);
	} else if (config.name && !config.name) {
		id = changeCase.snakeCase(config.name);
	}

	return {
		type: prismic.CustomTypeModelSliceType.SharedSlice,
		id,
		name,
		description: changeCase.sentenceCase(faker.words(faker.range(5, 10))),
		variations: config.variations || ([] as Variation[]),
	};
};
