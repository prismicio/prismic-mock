import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig, ModelValue } from "../types";

import * as modelGen from "../model";

import { slice } from "./slice";
import { sharedSlice } from "./sharedSlice";

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

export type MockSliceZoneValueConfig<
	Model extends prismicT.CustomTypeModelSliceZoneField = prismicT.CustomTypeModelSliceZoneField,
> = {
	sharedSliceModels?: prismicT.SharedSliceModel[];
	pattern?: keyof typeof patterns;
} & MockValueConfig<Model>;

export const sliceZone = <
	Model extends prismicT.CustomTypeModelSliceZoneField = prismicT.CustomTypeModelSliceZoneField,
>(
	config: MockSliceZoneValueConfig<Model> = {},
): ModelValue<Model> => {
	const faker = createFaker(config.seed);

	const model = config.model || modelGen.sliceZone({ seed: config.seed });

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
			const choices = Object.entries(model.config.choices);
			const [choiceType, choiceModel] = faker.random.arrayElement(choices);

			const choiceLabels = model.config.labels[choiceType] || [];
			const choiceLabel = faker.random.arrayElement(choiceLabels);

			switch (choiceModel.type) {
				case prismicT.CustomTypeModelSliceType.Slice: {
					return slice({
						seed: config.seed,
						model: choiceModel,
						type: choiceType,
						label: choiceLabel ? choiceLabel.name : null,
					});
				}

				case prismicT.CustomTypeModelSliceType.SharedSlice: {
					const sharedSliceModel = config.sharedSliceModels?.find(
						(sharedSliceModel) => sharedSliceModel.id === choiceType,
					);

					if (sharedSliceModel) {
						return sharedSlice({
							seed: config.seed,
							model: sharedSliceModel,
						});
					}
				}
			}
		})
		.filter(
			(slice): slice is prismicT.Slice | prismicT.SharedSlice =>
				slice !== undefined,
		) as ModelValue<Model>;
};