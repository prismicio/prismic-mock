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
> = Pick<MockSharedSliceVariationValueConfig, "pattern"> &
	MockValueConfig<Model>;

export const sharedSlice = <
	Model extends prismicT.SharedSliceModel = prismicT.SharedSliceModel,
>(
	config: MockSharedSliceValueConfig<Model> = {},
): ModelValue<Model> => {
	const faker = createFaker(config.seed);

	const model = config.model || modelGen.sharedSlice({ seed: config.seed });
	const variationModel = faker.random.arrayElement(model.variations);

	return sharedSliceVariation({
		seed: config.seed,
		model: variationModel,
		pattern: config.pattern,
		type: model.id,
	}) as ModelValue<Model>;
};