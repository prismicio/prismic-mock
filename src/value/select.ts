import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { IsEmptyMockValueConfig, MockValueConfig } from "../types";

import * as modelGen from "../model";

export type MockSelectValueConfig<
	Model extends prismicT.CustomTypeModelSelectField = prismicT.CustomTypeModelSelectField,
	IsEmpty extends boolean = boolean,
> = MockValueConfig<Model> & IsEmptyMockValueConfig<IsEmpty>;

export type MockSelectValue<
	Model extends prismicT.CustomTypeModelSelectField = prismicT.CustomTypeModelSelectField,
	IsEmpty extends boolean = boolean,
> = prismicT.SelectField<Model["config"]["options"][number], IsEmpty>;

export const select = <
	Model extends prismicT.CustomTypeModelSelectField = prismicT.CustomTypeModelSelectField,
	IsEmpty extends boolean = false,
>(
	config: MockSelectValueConfig<Model, IsEmpty> = {},
): MockSelectValue<Model, IsEmpty> => {
	const faker = createFaker(config.seed);

	const model = config.model || modelGen.select({ seed: config.seed });
	const defaultValue = model.config.default_value;

	if (config.isEmpty) {
		return null as MockSelectValue<Model, IsEmpty>;
	} else {
		return (
			typeof defaultValue === "string" && faker.datatype.boolean()
				? defaultValue
				: faker.random.arrayElement(model.config.options)
		) as MockSelectValue<Model, IsEmpty>;
	}
};
