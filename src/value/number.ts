import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { IsEmptyMockValueConfig, MockValueConfig } from "../types";

export type MockNumberValueConfig<
	Model extends prismicT.CustomTypeModelNumberField = prismicT.CustomTypeModelNumberField,
	IsEmpty extends boolean = boolean,
> = MockValueConfig<Model> & IsEmptyMockValueConfig<IsEmpty>;

export type MockNumberValue<IsEmpty extends boolean = boolean> =
	prismicT.NumberField<IsEmpty>;

export const number = <
	Model extends prismicT.CustomTypeModelNumberField = prismicT.CustomTypeModelNumberField,
	IsEmpty extends boolean = false,
>(
	config: MockNumberValueConfig<Model, IsEmpty> = {},
): MockNumberValue<IsEmpty> => {
	const faker = createFaker(config.seed);

	return (
		config.isEmpty ? null : faker.datatype.number()
	) as MockNumberValue<IsEmpty>;
};
