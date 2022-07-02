import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockGeoPointValueConfig<
	Model extends prismicT.CustomTypeModelGeoPointField = prismicT.CustomTypeModelGeoPointField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = MockValueConfig<Model> & MockValueStateConfig<State>;

export type MockGeoPointValue<
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.GeoPointField<State>;

export const geoPoint = <
	Model extends prismicT.CustomTypeModelGeoPointField = prismicT.CustomTypeModelGeoPointField,
	State extends prismicT.FieldState = "filled",
>(
	config: MockGeoPointValueConfig<Model, State> = {},
): MockGeoPointValue<State> => {
	const faker = config.faker || createFaker(config.seed);

	return (
		config.state === "empty"
			? {}
			: {
					longitude: faker.rangeFloat(-180, 180),
					latitude: faker.rangeFloat(-90, 90),
			  }
	) as MockGeoPointValue<State>;
};
