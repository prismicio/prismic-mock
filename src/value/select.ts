import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

import * as modelGen from "../model";

export type MockSelectValueConfig<
	Model extends prismicT.CustomTypeModelSelectField = prismicT.CustomTypeModelSelectField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = MockValueConfig<Model> & MockValueStateConfig<State>;

export type MockSelectValue<
	Model extends prismicT.CustomTypeModelSelectField = prismicT.CustomTypeModelSelectField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.SelectField<
	NonNullable<NonNullable<Model["config"]>["options"]>[number],
	State
>;

export const select = <
	Model extends prismicT.CustomTypeModelSelectField = prismicT.CustomTypeModelSelectField,
	State extends prismicT.FieldState = "filled",
>(
	config: MockSelectValueConfig<Model, State>,
): MockSelectValue<Model, State> => {
	const faker = config.faker || createFaker(config.seed);

	const model = config.model || modelGen.select({ faker });
	const defaultValue = model.config?.default_value;
	const options = model.config?.options || [];

	if (config.state === "empty") {
		return null as MockSelectValue<Model, State>;
	} else {
		return (
			typeof defaultValue === "string" && faker.boolean()
				? defaultValue
				: faker.randomElement(options)
		) as MockSelectValue<Model, State>;
	}
};
