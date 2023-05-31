import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockKeyTextValueConfig<
	Model extends prismic.CustomTypeModelKeyTextField = prismic.CustomTypeModelKeyTextField,
	State extends prismic.FieldState = prismic.FieldState,
> = MockValueConfig<Model> & MockValueStateConfig<State>;

export type MockKeyTextValue<
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.KeyTextField<State>;

export const keyText = <
	Model extends prismic.CustomTypeModelKeyTextField = prismic.CustomTypeModelKeyTextField,
	State extends prismic.FieldState = "filled",
>(
	config: MockKeyTextValueConfig<Model, State>,
): MockKeyTextValue<State> => {
	const faker = config.faker || createFaker(config.seed);

	return (
		config.state === "empty" ? null : changeCase.sentenceCase(faker.words(3))
	) as MockKeyTextValue<State>;
};
