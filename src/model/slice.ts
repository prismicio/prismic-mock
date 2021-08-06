import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";
import {
	buildMockGroupFieldMap,
	BuildMockGroupFieldMapConfig,
} from "../lib/buildMockGroupFieldMap";

import { MockModelConfig } from "../types";

type MockSliceModelConfig = {
	repeatFieldConfig?: BuildMockGroupFieldMapConfig;
	nonRepeatFieldConfig?: BuildMockGroupFieldMapConfig;
} & MockModelConfig;

export const slice = (
	config: MockSliceModelConfig = {},
): prismicT.CustomTypeModelSlice => {
	const faker = createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelSliceType.Slice,
		icon: changeCase.snakeCase(faker.company.bsNoun()),
		display: faker.datatype.boolean()
			? prismicT.CustomTypeModelSliceDisplay.Grid
			: prismicT.CustomTypeModelSliceDisplay.List,
		fieldset: changeCase.capitalCase(faker.lorem.words()),
		description: faker.lorem.sentence(),
		repeat: buildMockGroupFieldMap({
			seed: config.repeatFieldConfig?.seed ?? config.seed,
			configs: config.repeatFieldConfig?.configs,
		}),
		"non-repeat": buildMockGroupFieldMap({
			seed: config.nonRepeatFieldConfig?.seed ?? config.seed,
			configs: config.nonRepeatFieldConfig?.configs,
		}),
	};
};
