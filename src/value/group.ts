import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";
import { fieldForGroupModelValueMap } from "../lib/fieldForGroupModelValueMap";

import { MockValueConfig, ModelValue } from "../types";

import * as modelGen from "../model";

const patterns = {
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

export type MockGroupValueConfig<
	Model extends prismicT.CustomTypeModelGroupField = prismicT.CustomTypeModelGroupField,
> = {
	pattern?: keyof typeof patterns;
} & MockValueConfig<Model>;

export const group = <
	Model extends prismicT.CustomTypeModelGroupField = prismicT.CustomTypeModelGroupField,
>(
	config: MockGroupValueConfig<Model> = {},
): ModelValue<Model> => {
	const faker = createFaker(config.seed);

	const model = config.model || modelGen.group({ seed: config.seed });

	const patternKey =
		config.pattern ||
		faker.random.arrayElement(
			Object.keys(patterns) as (keyof typeof patterns)[],
		);
	const pattern = patterns[patternKey];

	const itemsCount = faker.datatype.number({
		min: pattern.minItems,
		max: pattern.maxItems,
	});

	return Array(itemsCount)
		.fill(undefined)
		.map(() => {
			return fieldForGroupModelValueMap({
				seed: config.seed,
				map: model.config.fields,
			});
		}) as ModelValue<Model>;
};
