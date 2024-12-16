import * as prismic from "@prismicio/client";

import { capitalCase } from "../lib/changeCase";
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
			label: capitalCase(faker.word()),
		},
	};
};
