import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

type MockBooleanValueConfig<
	Model extends prismicT.CustomTypeModelBooleanField = prismicT.CustomTypeModelBooleanField,
> = MockValueConfig<Model>;

export const boolean = (
	config: MockBooleanValueConfig = {},
): prismicT.BooleanField => {
	const faker = createFaker(config.seed);

	return faker.datatype.boolean();
};
