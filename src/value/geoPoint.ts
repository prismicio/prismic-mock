import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { IsEmptyMockValueConfig, MockValueConfig } from "../types";

export type MockGeoPointValueConfig<
	Model extends prismicT.CustomTypeModelGeoPointField = prismicT.CustomTypeModelGeoPointField,
	IsEmpty extends boolean = boolean,
> = MockValueConfig<Model> & IsEmptyMockValueConfig<IsEmpty>;

export type MockGeoPointValue<IsEmpty extends boolean = boolean> =
	prismicT.GeoPointField<IsEmpty>;

export const geoPoint = <
	Model extends prismicT.CustomTypeModelGeoPointField = prismicT.CustomTypeModelGeoPointField,
	IsEmpty extends boolean = false,
>(
	config: MockGeoPointValueConfig<Model, IsEmpty> = {},
): MockGeoPointValue<IsEmpty> => {
	const faker = createFaker(config.seed);

	const coordinates = faker.address.nearbyGPSCoordinate();

	return (
		config.isEmpty
			? {}
			: {
					longitude: Number.parseFloat(coordinates[0]),
					latitude: Number.parseFloat(coordinates[1]),
			  }
	) as MockGeoPointValue<IsEmpty>;
};
