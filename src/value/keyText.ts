import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

type MockKeyTextValueConfig<
	Model extends prismicT.CustomTypeModelKeyTextField = prismicT.CustomTypeModelKeyTextField,
> = MockValueConfig<Model>;

export const keyText = (
	config: MockKeyTextValueConfig = {},
): prismicT.KeyTextField => {
	const faker = createFaker(config.seed);

	return changeCase.sentenceCase(faker.lorem.words(3));
};
