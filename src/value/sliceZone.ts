import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";
import { ValueForModelMapConfigs } from "../lib/valueForModelMap";

import { MockValueConfig, MockValueStateConfig, ModelValue } from "../types";

import * as modelGen from "../model";

import { slice } from "./slice";
import { sharedSlice } from "./sharedSlice";

export type MockSliceZoneValueConfig<
	Model extends prismicT.CustomTypeModelSliceZoneField = prismicT.CustomTypeModelSliceZoneField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = {
	sharedSliceModels?: prismicT.SharedSliceModel[];
	itemsCount?: State extends "empty" ? 0 : number;
	primaryFieldConfigs?: ValueForModelMapConfigs;
	itemsFieldConfigs?: ValueForModelMapConfigs;
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

export const sliceZone = <
	Model extends prismicT.CustomTypeModelSliceZoneField = prismicT.CustomTypeModelSliceZoneField,
	State extends prismicT.FieldState = prismicT.FieldState,
>(
	config: MockSliceZoneValueConfig<Model, State> = {},
): ModelValue<Model, State> => {
	if (config.state === "empty") {
		return [] as ModelValue<Model, State>;
	} else {
		const faker = createFaker(config.seed);

		const model = config.model || modelGen.sliceZone({ seed: config.seed });

		if (Object.keys(model.config.choices).length > 0) {
			const itemsCount =
				config.itemsCount ??
				faker.datatype.number({
					min: 1,
					max: 6,
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
								primaryFieldConfigs: config.primaryFieldConfigs,
								itemsFieldConfigs: config.itemsFieldConfigs,
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
									primaryFieldConfigs: config.primaryFieldConfigs,
									itemsFieldConfigs: config.itemsFieldConfigs,
								});
							}
						}
					}
				})
				.filter(
					(slice): slice is prismicT.Slice | prismicT.SharedSlice =>
						slice !== undefined,
				) as ModelValue<Model, State>;
		} else {
			return [] as unknown as ModelValue<Model, State>;
		}
	}
};
