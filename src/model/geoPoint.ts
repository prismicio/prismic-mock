import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockGeoPointModelConfig = MockModelConfig;

export const geoPoint = (
	config: MockGeoPointModelConfig = {},
): prismicT.CustomTypeModelGeoPointField => {
	const faker = createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.GeoPoint,
		config: {
			label: changeCase.capitalCase(faker.word()),
		},
	};
};
