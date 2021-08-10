import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

export type MockColorValueConfig<
	Model extends prismicT.CustomTypeModelColorField = prismicT.CustomTypeModelColorField,
> = MockValueConfig<Model>;

export const color = (
	config: MockColorValueConfig = {},
): prismicT.ColorField => {
	const faker = createFaker(config.seed);

	return faker.internet.color().toUpperCase() as prismicT.ColorField;
};
