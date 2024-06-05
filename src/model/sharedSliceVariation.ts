import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";
import { getMockImageData } from "../lib/getMockImageData";

import {
	MockModelConfig,
	NestedGroupFieldModelMap,
	SlicePrimaryFieldModelMap,
} from "../types";

export type MockSharedSliceVariationModelConfig<
	ID extends string = string,
	PrimaryFields extends SlicePrimaryFieldModelMap = SlicePrimaryFieldModelMap,
	ItemsFields extends NestedGroupFieldModelMap = NestedGroupFieldModelMap,
> = {
	id?: ID;
	name?: string;
	primaryFields?: PrimaryFields;
	itemsFields?: ItemsFields;
} & MockModelConfig;

export const sharedSliceVariation = <
	ID extends string,
	PrimaryFields extends SlicePrimaryFieldModelMap,
	ItemsFields extends NestedGroupFieldModelMap,
>(
	config: MockSharedSliceVariationModelConfig<ID, PrimaryFields, ItemsFields>,
): prismic.SharedSliceModelVariation<ID, PrimaryFields, ItemsFields> => {
	const faker = config.faker || createFaker(config.seed);

	let name: string =
		config.name || changeCase.capitalCase(faker.words(faker.range(1, 2)));
	let id: ID = config.id || (changeCase.snakeCase(name) as ID);

	if (config.id && !config.name) {
		name = changeCase.pascalCase(config.id);
	} else if (config.name && !config.name) {
		id = changeCase.snakeCase(config.name) as ID;
	}

	const imageData = getMockImageData({ faker });

	return {
		id,
		name,
		description: changeCase.sentenceCase(faker.words(faker.range(5, 10))),
		docURL: faker.url(),
		version: faker.hash(7),
		primary: config.primaryFields || ({} as PrimaryFields),
		items: config.itemsFields || ({} as ItemsFields),
		imageUrl: imageData.url,
	};
};
