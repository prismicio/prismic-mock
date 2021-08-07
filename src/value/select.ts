import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

import * as modelGen from "../model";

type MockSelectValueConfig<
	Model extends prismicT.CustomTypeModelSelectField = prismicT.CustomTypeModelSelectField,
> = MockValueConfig<Model>;

export const select = (
	config: MockSelectValueConfig = {},
): prismicT.SelectField => {
	const faker = createFaker(config.seed);

	const model = config.model || modelGen.select({ seed: config.seed });
	const defaultValue = model.config.default_value;

	return typeof defaultValue === "string" && faker.datatype.boolean()
		? defaultValue
		: faker.random.arrayElement(model.config.options);
};
