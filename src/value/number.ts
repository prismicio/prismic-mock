import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

type MockNumberValueConfig<
	Model extends prismicT.CustomTypeModelNumberField = prismicT.CustomTypeModelNumberField,
> = MockValueConfig<Model>;

export const number = (
	config: MockNumberValueConfig = {},
): prismicT.NumberField => {
	const faker = createFaker(config.seed);

	return faker.datatype.number();
};
