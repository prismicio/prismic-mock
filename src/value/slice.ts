import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { MockValueConfig, ModelValue } from "../types";

import { generateFieldId } from "../lib/generateFieldId";
import { fieldForGroupModelValueMap } from "../lib/fieldForGroupModelValueMap";
import { createFaker } from "../lib/createFaker";

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

export type MockSliceValueConfig<
	Model extends prismicT.CustomTypeModelSlice = prismicT.CustomTypeModelSlice,
> = {
	pattern?: keyof typeof patterns;
} & MockValueConfig<Model>;

export const slice = <
	Model extends prismicT.CustomTypeModelSlice = prismicT.CustomTypeModelSlice,
>(
	config: MockSliceValueConfig<Model> = {},
): ModelValue<Model> => {
	const faker = createFaker(config.seed);

	const model = config.model || modelGen.slice({ seed: config.seed });

	const patternKey =
		config.pattern ||
		faker.random.arrayElement(
			Object.keys(patterns) as (keyof typeof patterns)[],
		);
	const pattern = patterns[patternKey];

	const sliceType = generateFieldId({ seed: config.seed });
	const sliceLabel = changeCase.capitalCase(faker.company.bsNoun());

	const itemsCount =
		Object.keys(model.repeat).length > 0
			? faker.datatype.number({
					min: pattern.minItems,
					max: pattern.maxItems,
			  })
			: 0;

	return {
		slice_type: sliceType,
		slice_label: sliceLabel,
		primary: fieldForGroupModelValueMap({
			seed: config.seed,
			map: model["non-repeat"],
		}),
		items: Array(itemsCount)
			.fill(undefined)
			.map(() => {
				return fieldForGroupModelValueMap({
					seed: config.seed,
					map: model.repeat,
				});
			}),
	} as ModelValue<Model>;
};
