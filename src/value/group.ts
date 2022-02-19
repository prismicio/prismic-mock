import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";
import {
	valueForModelMap,
	ValueForModelMapConfigs,
} from "../lib/valueForModelMap";

import { MockValueConfig, MockValueStateConfig, ModelValue } from "../types";

import * as modelGen from "../model";

export type MockGroupValueConfig<
	Model extends prismicT.CustomTypeModelGroupField = prismicT.CustomTypeModelGroupField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = {
	itemsCount?: State extends "empty" ? 0 : number;
	configs?: ValueForModelMapConfigs;
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockGroupValue<
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.DateField<State>;

export const group = <
	Model extends prismicT.CustomTypeModelGroupField = prismicT.CustomTypeModelGroupField,
	State extends prismicT.FieldState = "filled",
>(
	config: MockGroupValueConfig<Model, State> = {},
): ModelValue<Model, State> => {
	if (config.state === "empty") {
		return [] as ModelValue<Model, State>;
	} else {
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
			}) as ModelValue<Model, State>;
	}
};
