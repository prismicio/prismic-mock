import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig, ModelValue } from "../types";

import * as modelGen from "../model";
import {
	sharedSliceVariation,
	MockSharedSliceVariationValueConfig,
} from "./sharedSliceVariation";

export type MockSharedSliceValueConfig<
	Model extends prismicT.SharedSliceModel = prismicT.SharedSliceModel,
> = Pick<
	MockSharedSliceVariationValueConfig,
	"itemsCount" | "primaryFieldConfigs" | "itemsFieldConfigs"
> &
	MockValueConfig<Model>;

export const sharedSlice = <
	Model extends prismicT.SharedSliceModel = prismicT.SharedSliceModel,
>(
	config: MockSharedSliceValueConfig<Model>,
): ModelValue<Model> => {
	const faker = config.faker || createFaker(config.seed);

	const model = config.model || modelGen.sharedSlice({ faker });
	const variationModel = faker.randomElement(model.variations);

	return sharedSliceVariation({
		faker,
		model: variationModel,
		itemsCount: config.itemsCount,
		type: model.id,
		primaryFieldConfigs: config.primaryFieldConfigs,
		itemsFieldConfigs: config.itemsFieldConfigs,
	}) as ModelValue<Model>;
};
