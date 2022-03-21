import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

export type MockBooleanValueConfig<
	Model extends prismicT.CustomTypeModelBooleanField = prismicT.CustomTypeModelBooleanField,
> = MockValueConfig<Model>;

export const boolean = <
	Model extends prismicT.CustomTypeModelBooleanField = prismicT.CustomTypeModelBooleanField,
>(
	config: MockBooleanValueConfig<Model> = {},
): prismicT.BooleanField => {
	const faker = createFaker(config.seed);

	return faker.boolean();
};
