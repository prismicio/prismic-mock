import * as prismic from "@prismicio/client";

import { createFaker } from "../lib/createFaker";
import {
	valueForModelMap,
	ValueForModelMapConfigs,
} from "../lib/valueForModelMap";

import { MockValueConfig, MockValueStateConfig, ModelValue } from "../types";

import * as modelGen from "../model";

export type MockGroupValueConfig<
	Model extends prismic.CustomTypeModelGroupField = prismic.CustomTypeModelGroupField,
	State extends prismic.FieldState = prismic.FieldState,
> = {
	itemsCount?: State extends "empty" ? 0 : number;
	configs?: ValueForModelMapConfigs;
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockGroupValue<
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.DateField<State>;

export const group = <
	Model extends prismic.CustomTypeModelGroupField = prismic.CustomTypeModelGroupField,
	State extends prismic.FieldState = "filled",
>(
	config: MockGroupValueConfig<Model, State>,
): ModelValue<Model, State> => {
	if (config.state === "empty") {
		return [] as ModelValue<Model, State>;
	} else {
		const faker = config.faker || createFaker(config.seed);

		const model = config.model || modelGen.group({ faker });

		const itemsCount = config.itemsCount ?? faker.range(1, 6);

		return Array(itemsCount)
			.fill(undefined)
			.map(() => {
				return valueForModelMap({
					faker,
					map: model.config?.fields || {},
					configs: config.configs,
				});
			}) as ModelValue<Model, State>;
	}
};
