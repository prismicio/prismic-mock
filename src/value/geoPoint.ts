import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

export type MockGeoPointValueConfig<
	Model extends prismicT.CustomTypeModelGeoPointField = prismicT.CustomTypeModelGeoPointField,
> = MockValueConfig<Model>;

export const geoPoint = (
	config: MockGeoPointValueConfig = {},
): prismicT.GeoPointField => {
	const faker = createFaker(config.seed);

	const coordinates = faker.address.nearbyGPSCoordinate();

	return {
		longitude: Number.parseFloat(coordinates[0]),
		latitude: Number.parseFloat(coordinates[1]),
	};
};
