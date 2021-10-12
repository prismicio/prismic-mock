import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { GroupFieldModelMap, MockModelConfig } from "../types";

export type MockSharedSliceVariationModelConfig<
	ID extends string = string,
	PrimaryFields extends GroupFieldModelMap = GroupFieldModelMap,
	ItemsFields extends GroupFieldModelMap = GroupFieldModelMap,
> = {
	id?: ID;
	name?: string;
	primaryFields?: PrimaryFields;
	itemsFields?: ItemsFields;
} & MockModelConfig;

export const sharedSliceVariation = <
	ID extends string,
	PrimaryFields extends GroupFieldModelMap,
	ItemsFields extends GroupFieldModelMap,
>(
	config: MockSharedSliceVariationModelConfig<
		ID,
		PrimaryFields,
		ItemsFields
	> = {},
): prismicT.SharedSliceModelVariation<ID, PrimaryFields, ItemsFields> => {
	const faker = createFaker(config.seed);

	let name: string =
		config.name || changeCase.capitalCase(faker.company.bsNoun());
	let id: ID = config.id || (changeCase.snakeCase(name) as ID);

	if (config.id && !config.name) {
		name = changeCase.pascalCase(config.id);
	} else if (config.name && !config.name) {
		id = changeCase.snakeCase(config.name) as ID;
	}

	return {
		id,
		name,
		description: faker.lorem.sentence(),
		docURL: faker.internet.url(),
		version: faker.git.shortSha(),
		primary: config.primaryFields || ({} as PrimaryFields),
		items: config.itemsFields || ({} as ItemsFields),
	};
};
