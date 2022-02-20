import * as prismicT from "@prismicio/types";

import { MockValueConfig, ModelValue } from "../types";

import { createFaker } from "../lib/createFaker";
import { generateFieldId } from "../lib/generateFieldId";
import {
	valueForModelMap,
	ValueForModelMapConfigs,
} from "../lib/valueForModelMap";

import * as modelGen from "../model";

export type MockSharedSliceVariationValueConfig<
	Model extends prismicT.SharedSliceModelVariation = prismicT.SharedSliceModelVariation,
> = {
	type?: string;
	label?: string;
	itemsCount?: number;
	primaryFieldConfigs?: ValueForModelMapConfigs;
	itemsFieldConfigs?: ValueForModelMapConfigs;
} & MockValueConfig<Model>;

export const sharedSliceVariation = <
	Model extends prismicT.SharedSliceModelVariation = prismicT.SharedSliceModelVariation,
>(
	config: MockSharedSliceVariationValueConfig<Model> = {},
): ModelValue<Model> => {
	const faker = createFaker(config.seed);

	const model =
		config.model || modelGen.sharedSliceVariation({ seed: config.seed });

	const sliceType = config.type ?? generateFieldId({ seed: config.seed });

	const itemsCount =
		Object.keys(model.items).length > 0
			? config.itemsCount ?? faker.range(1, 6)
			: 0;

	return {
		slice_type: sliceType,
		slice_label: null,
		variation: model.id,
		version: faker.hash(7),
		primary: valueForModelMap({
			seed: config.seed,
			map: model.primary,
			configs: config.primaryFieldConfigs,
		}),
		items: Array(itemsCount)
			.fill(undefined)
			.map(() => {
				return valueForModelMap({
					seed: config.seed,
					map: model.items,
					configs: config.itemsFieldConfigs,
				});
			}),
	} as ModelValue<Model>;
};
