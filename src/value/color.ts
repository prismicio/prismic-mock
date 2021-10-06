import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { IsEmptyMockValueConfig, MockValueConfig } from "../types";

export type MockColorValueConfig<
	Model extends prismicT.CustomTypeModelColorField = prismicT.CustomTypeModelColorField,
	IsEmpty extends boolean = boolean,
> = MockValueConfig<Model> & IsEmptyMockValueConfig<IsEmpty>;

export type MockColorValue<IsEmpty extends boolean = boolean> =
	prismicT.ColorField<IsEmpty>;

export const color = <
	Model extends prismicT.CustomTypeModelColorField = prismicT.CustomTypeModelColorField,
	IsEmpty extends boolean = false,
>(
	config: MockColorValueConfig<Model, IsEmpty> = {},
): MockColorValue<IsEmpty> => {
	const faker = createFaker(config.seed);

	return (
		config.isEmpty ? null : faker.internet.color().toUpperCase()
	) as MockColorValue<IsEmpty>;
};
