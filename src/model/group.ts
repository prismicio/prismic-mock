import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import {
	buildMockGroupFieldMap,
	BuildMockGroupFieldMapConfig,
} from "../lib/buildMockGroupFieldMap";
import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

type MockGroupModelConfig = BuildMockGroupFieldMapConfig & MockModelConfig;

export const group = (
	config: MockGroupModelConfig = {},
): prismicT.CustomTypeModelGroupField => {
	const faker = createFaker(config.seed);

	const fields = buildMockGroupFieldMap({
		seed: config.seed,
		configs: config.configs,
	});

	return {
		type: prismicT.CustomTypeModelFieldType.Group,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			fields,
		},
	};
};
