import * as prismic from "@prismicio/client";

import { MockValueConfig, ModelValue } from "../types";

import { createFaker } from "../lib/createFaker";
import { generateFieldId } from "../lib/generateFieldId";
import {
	valueForModelMap,
	ValueForModelMapConfigs,
} from "../lib/valueForModelMap";

import * as modelGen from "../model";

export type MockSharedSliceVariationValueConfig<
	Model extends
		prismic.SharedSliceModelVariation = prismic.SharedSliceModelVariation,
> = {
	type?: string;
	label?: string;
	itemsCount?: number;
	primaryFieldConfigs?: ValueForModelMapConfigs;
	itemsFieldConfigs?: ValueForModelMapConfigs;
} & MockValueConfig<Model>;

export const sharedSliceVariation = <
	Model extends
		prismic.SharedSliceModelVariation = prismic.SharedSliceModelVariation,
>(
	config: MockSharedSliceVariationValueConfig<Model>,
): ModelValue<Model> => {
	const faker = config.faker || createFaker(config.seed);

	const model = config.model || modelGen.sharedSliceVariation({ faker });

	const sliceType = config.type ?? generateFieldId({ faker });

	const itemsCount =
		model.items && Object.keys(model.items).length > 0
			? config.itemsCount ?? faker.range(1, 6)
			: 0;

	return {
		slice_type: sliceType,
		slice_label: null,
		variation: model.id,
		version: faker.hash(7),
		primary: valueForModelMap({
			faker,
			map: model.primary || {},
			configs: config.primaryFieldConfigs,
		}),
		items: Array(itemsCount)
			.fill(undefined)
			.map(() => {
				return valueForModelMap({
					faker,
					map: model.items || {},
					configs: config.itemsFieldConfigs,
				});
			}),
	} as ModelValue<Model>;
};
