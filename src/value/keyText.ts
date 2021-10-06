import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { IsEmptyMockValueConfig, MockValueConfig } from "../types";

export type MockKeyTextValueConfig<
	Model extends prismicT.CustomTypeModelKeyTextField = prismicT.CustomTypeModelKeyTextField,
	IsEmpty extends boolean = boolean,
> = MockValueConfig<Model> & IsEmptyMockValueConfig<IsEmpty>;

export type MockKeyTextValue<IsEmpty extends boolean = boolean> =
	prismicT.KeyTextField<IsEmpty>;

export const keyText = <
	Model extends prismicT.CustomTypeModelKeyTextField = prismicT.CustomTypeModelKeyTextField,
	IsEmpty extends boolean = false,
>(
	config: MockKeyTextValueConfig<Model, IsEmpty> = {},
): MockKeyTextValue<IsEmpty> => {
	const faker = createFaker(config.seed);

	return (
		config.isEmpty ? null : changeCase.sentenceCase(faker.lorem.words(3))
	) as MockKeyTextValue<IsEmpty>;
};
