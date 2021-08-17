import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { MockValueConfig, ModelValue } from "../types";

import { createFaker } from "../lib/createFaker";
import { generateFieldId } from "../lib/generateFieldId";
import {
	valueForModelMap,
	ValueForModelMapConfigs,
} from "../lib/valueForModelMap";

import * as modelGen from "../model";

const patterns = {
	none: {
		minItems: 0,
		maxItems: 0,
	},
	short: {
		minItems: 1,
		maxItems: 3,
	},
	medium: {
		minItems: 3,
		maxItems: 6,
	},
	long: {
		minItems: 6,
		maxItems: 12,
	},
} as const;

export type MockSharedSliceVariationValueConfig<
	Model extends prismicT.SharedSliceModelVariation = prismicT.SharedSliceModelVariation,
> = {
	type?: string;
	label?: string;
	pattern?: keyof typeof patterns;
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

	const patternKey =
		config.pattern ||
		faker.random.arrayElement(
			Object.keys(patterns) as (keyof typeof patterns)[],
		);
	const pattern = patterns[patternKey];

	const sliceType = config.type ?? generateFieldId({ seed: config.seed });
	const sliceLabel =
		config.label ?? changeCase.capitalCase(faker.company.bsNoun());

	const itemsCount =
		Object.keys(model.items).length > 0
			? faker.datatype.number({
					min: pattern.minItems,
					max: pattern.maxItems,
			  })
			: 0;

	return {
		slice_type: sliceType,
		slice_label: sliceLabel,
		variation: model.id,
		version: faker.git.shortSha(),
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
