import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockNumberValueConfig<
	Model extends prismicT.CustomTypeModelNumberField = prismicT.CustomTypeModelNumberField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = MockValueConfig<Model> & MockValueStateConfig<State>;

export type MockNumberValue<
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.NumberField<State>;

export const number = <
	Model extends prismicT.CustomTypeModelNumberField = prismicT.CustomTypeModelNumberField,
	State extends prismicT.FieldState = "filled",
>(
	config: MockNumberValueConfig<Model, State> = {},
): MockNumberValue<State> => {
	const faker = createFaker(config.seed);

	return (
		config.state === "empty" ? null : faker.datatype.number()
	) as MockNumberValue<State>;
};
