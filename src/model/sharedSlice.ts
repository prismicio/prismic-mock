import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

import {
	MockSharedSliceVariationModelConfig,
	sharedSliceVariation,
} from "./sharedSliceVariation";

type MockSharedSliceModelConfig<
	Variation extends prismicT.SharedSliceModelVariation,
> = (
	| {
			variations?: Variation[];
			variationsCount?: never;
	  }
	| {
			variations?: never;
			variationsCount?: number;
	  }
) &
	Pick<
		MockSharedSliceVariationModelConfig,
		"itemsFieldConfig" | "primaryFieldConfig"
	> &
	MockModelConfig;

export const sharedSlice = <
	Variation extends prismicT.SharedSliceModelVariation,
>(
	config: MockSharedSliceModelConfig<Variation> = {},
): prismicT.SharedSliceModel<string, Variation> => {
	const faker = createFaker(config.seed);

	const name = changeCase.capitalCase(faker.company.bsNoun());

	let variations: Variation[] = [];

	if ("variations" in config) {
		variations = config.variations || [];
	} else {
		const variationsCount =
			config.variationsCount ?? faker.datatype.number({ min: 1, max: 3 });

		variations = Array(variationsCount)
			.fill(undefined)
			.map(
				() =>
					sharedSliceVariation({
						seed: config.seed,
						itemsFieldConfig: config.itemsFieldConfig,
						primaryFieldConfig: config.primaryFieldConfig,
					}) as Variation,
			);
	}

	return {
		type: prismicT.CustomTypeModelSliceType.SharedSlice,
		id: changeCase.snakeCase(name),
		name,
		description: faker.lorem.sentence(),
		variations,
	};
};
