import * as prismic from "@prismicio/client";

import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockColorValueConfig<
	Model extends
		prismic.CustomTypeModelColorField = prismic.CustomTypeModelColorField,
	State extends prismic.FieldState = prismic.FieldState,
> = MockValueConfig<Model> & MockValueStateConfig<State>;

export type MockColorValue<
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.ColorField<State>;

export const color = <
	Model extends
		prismic.CustomTypeModelColorField = prismic.CustomTypeModelColorField,
	State extends prismic.FieldState = "filled",
>(
	config: MockColorValueConfig<Model, State>,
): MockColorValue<State> => {
	const faker = config.faker || createFaker(config.seed);

	return (
		config.state === "empty" ? null : faker.hexColor().toUpperCase()
	) as MockColorValue<State>;
};
