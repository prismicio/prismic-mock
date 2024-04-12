import * as prismic from "@prismicio/client";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

export type MockBooleanValueConfig<
	Model extends
		prismic.CustomTypeModelBooleanField = prismic.CustomTypeModelBooleanField,
> = MockValueConfig<Model>;

export const boolean = <Model extends prismic.CustomTypeModelBooleanField>(
	config: MockBooleanValueConfig<Model>,
): prismic.BooleanField => {
	const faker = config.faker || createFaker(config.seed);

	return faker.boolean();
};
