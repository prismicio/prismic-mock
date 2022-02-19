import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";
import {
	valueForModelMap,
	ValueForModelMapConfigs,
} from "../lib/valueForModelMap";

import { MockValueConfig, ModelValue } from "../types";

import * as modelGen from "../model";

export type MockGroupValueConfig<
	Model extends prismicT.CustomTypeModelGroupField = prismicT.CustomTypeModelGroupField,
> = {
	itemsCount?: number;
	configs?: ValueForModelMapConfigs;
} & MockValueConfig<Model>;

export const group = <
	Model extends prismicT.CustomTypeModelGroupField = prismicT.CustomTypeModelGroupField,
>(
	config: MockGroupValueConfig<Model> = {},
): ModelValue<Model> => {
	const faker = createFaker(config.seed);

	const model = config.model || modelGen.group({ seed: config.seed });

	const itemsCount =
		config.itemsCount ??
		faker.datatype.number({
			min: 1,
			max: 6,
		});

	return Array(itemsCount)
		.fill(undefined)
		.map(() => {
			return valueForModelMap({
				seed: config.seed,
				map: model.config.fields,
				configs: config.configs,
			});
		}) as ModelValue<Model>;
};
