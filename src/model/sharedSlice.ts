import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

import {
	MockSharedSliceVariationModelConfig,
	sharedSliceVariation,
} from "./sharedSliceVariation";

type MockSharedSliceModelConfig = {
	variationsCount?: number;
} & Pick<
	MockSharedSliceVariationModelConfig,
	"itemsFieldConfig" | "primaryFieldConfig"
> &
	MockModelConfig;

export const sharedSlice = (
	config: MockSharedSliceModelConfig = {},
): prismicT.SharedSliceModel => {
	const faker = createFaker(config.seed);

	const variationsCount =
		config.variationsCount ?? faker.datatype.number({ min: 1, max: 3 });

	const name = changeCase.capitalCase(faker.company.bsNoun());
	const variations = Array(variationsCount)
		.fill(undefined)
		.map(() =>
			sharedSliceVariation({
				seed: config.seed,
				itemsFieldConfig: config.itemsFieldConfig,
				primaryFieldConfig: config.primaryFieldConfig,
			}),
		);

	return {
		type: prismicT.CustomTypeModelSliceType.SharedSlice,
		id: changeCase.snakeCase(name),
		name,
		description: faker.lorem.sentence(),
		variations,
	};
};
