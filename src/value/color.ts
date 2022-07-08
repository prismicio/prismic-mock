import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockColorValueConfig<
	Model extends prismicT.CustomTypeModelColorField = prismicT.CustomTypeModelColorField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = MockValueConfig<Model> & MockValueStateConfig<State>;

export type MockColorValue<
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.ColorField<State>;

export const color = <
	Model extends prismicT.CustomTypeModelColorField = prismicT.CustomTypeModelColorField,
	State extends prismicT.FieldState = "filled",
>(
	config: MockColorValueConfig<Model, State>,
): MockColorValue<State> => {
	const faker = config.faker || createFaker(config.seed);

	return (
		config.state === "empty" ? null : faker.hexColor().toUpperCase()
	) as MockColorValue<State>;
};
