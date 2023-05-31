import * as prismic from "@prismicio/client";

import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockNumberValueConfig<
	Model extends prismic.CustomTypeModelNumberField = prismic.CustomTypeModelNumberField,
	State extends prismic.FieldState = prismic.FieldState,
> = MockValueConfig<Model> & MockValueStateConfig<State>;

export type MockNumberValue<
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.NumberField<State>;

export const number = <
	Model extends prismic.CustomTypeModelNumberField = prismic.CustomTypeModelNumberField,
	State extends prismic.FieldState = "filled",
>(
	config: MockNumberValueConfig<Model, State>,
): MockNumberValue<State> => {
	const faker = config.faker || createFaker(config.seed);

	return (
		config.state === "empty" ? null : faker.range(1, 100)
	) as MockNumberValue<State>;
};
