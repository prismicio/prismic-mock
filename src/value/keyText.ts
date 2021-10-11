import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockKeyTextValueConfig<
	Model extends prismicT.CustomTypeModelKeyTextField = prismicT.CustomTypeModelKeyTextField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = MockValueConfig<Model> & MockValueStateConfig<State>;

export type MockKeyTextValue<
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.KeyTextField<State>;

export const keyText = <
	Model extends prismicT.CustomTypeModelKeyTextField = prismicT.CustomTypeModelKeyTextField,
	State extends prismicT.FieldState = "filled",
>(
	config: MockKeyTextValueConfig<Model, State> = {},
): MockKeyTextValue<State> => {
	const faker = createFaker(config.seed);

	return (
		config.state ? null : changeCase.sentenceCase(faker.lorem.words(3))
	) as MockKeyTextValue<State>;
};
