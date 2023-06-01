import * as prismic from "@prismicio/client";

import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockGeoPointValueConfig<
	Model extends prismic.CustomTypeModelGeoPointField = prismic.CustomTypeModelGeoPointField,
	State extends prismic.FieldState = prismic.FieldState,
> = MockValueConfig<Model> & MockValueStateConfig<State>;

export type MockGeoPointValue<
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.GeoPointField<State>;

export const geoPoint = <
	Model extends prismic.CustomTypeModelGeoPointField = prismic.CustomTypeModelGeoPointField,
	State extends prismic.FieldState = "filled",
>(
	config: MockGeoPointValueConfig<Model, State>,
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
