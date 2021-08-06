import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";
import {
	buildMockGroupFieldMap,
	BuildMockGroupFieldMapConfig,
} from "../lib/buildMockGroupFieldMap";

import { MockModelConfig } from "../types";

export type MockSharedSliceVariationModelConfig = {
	primaryFieldConfig?: BuildMockGroupFieldMapConfig;
	itemsFieldConfig?: BuildMockGroupFieldMapConfig;
} & MockModelConfig;

export const sharedSliceVariation = (
	config: MockSharedSliceVariationModelConfig = {},
): prismicT.SharedSliceModelVariation => {
	const faker = createFaker(config.seed);

	const name = changeCase.capitalCase(faker.company.bsNoun());

	return {
		id: changeCase.snakeCase(name),
		name,
		description: faker.lorem.sentence(),
		docURL: faker.internet.url(),
		version: faker.git.shortSha(),
		primary: buildMockGroupFieldMap({
			seed: config.primaryFieldConfig?.seed ?? config.seed,
			configs: config.primaryFieldConfig?.configs,
		}),
		items: buildMockGroupFieldMap({
			seed: config.itemsFieldConfig?.seed ?? config.seed,
			configs: config.itemsFieldConfig?.configs,
		}),
	};
};
