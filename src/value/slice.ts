import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { MockValueConfig, ModelValue } from "../types";

import { createFaker } from "../lib/createFaker";
import { generateFieldId } from "../lib/generateFieldId";
import {
	valueForModelMap,
	ValueForModelMapConfigs,
} from "../lib/valueForModelMap";

import * as modelGen from "../model";

export type MockSliceValueConfig<
	Model extends prismic.CustomTypeModelSlice = prismic.CustomTypeModelSlice,
> = {
	type?: string;
	label?: string | null;
	itemsCount?: number;
	primaryFieldConfigs?: ValueForModelMapConfigs;
	itemsFieldConfigs?: ValueForModelMapConfigs;
} & MockValueConfig<Model>;

export const slice = <
	Model extends prismic.CustomTypeModelSlice = prismic.CustomTypeModelSlice,
>(
	config: MockSliceValueConfig<Model>,
): ModelValue<Model> => {
	const faker = config.faker || createFaker(config.seed);

	const model = config.model || modelGen.slice({ faker });

	const sliceType = config.type ?? generateFieldId({ faker });
	const sliceLabel =
		config.label !== undefined
			? config.label
			: changeCase.capitalCase(faker.words(faker.range(1, 2)));

	const itemsCount =
		model.repeat && Object.keys(model.repeat).length > 0
			? config.itemsCount ?? faker.range(1, 6)
			: 0;

	return {
		id: faker.hash(11),
		slice_type: sliceType,
		slice_label: sliceLabel,
		primary: valueForModelMap({
			faker,
			map: model["non-repeat"] || {},
			configs: config.primaryFieldConfigs,
		}),
		items: Array(itemsCount)
			.fill(undefined)
			.map(() => {
				return valueForModelMap({
					faker,
					map: model.repeat || {},
					configs: config.itemsFieldConfigs,
				});
			}),
	} as ModelValue<Model>;
};
