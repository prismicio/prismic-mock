import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockGeoPointModelConfig = MockModelConfig;

export const geoPoint = (
	config: MockGeoPointModelConfig,
): prismic.CustomTypeModelGeoPointField => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.GeoPoint,
		config: {
			label: changeCase.capitalCase(faker.word()),
		},
	};
};
