import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

type MockUIDValueConfig<
	Model extends prismicT.CustomTypeModelUIDField = prismicT.CustomTypeModelUIDField,
> = MockValueConfig<Model>;

export const uid = (
	config: MockUIDValueConfig = {},
): prismicT.PrismicDocument["uid"] => {
	const faker = createFaker(config.seed);

	return changeCase.snakeCase(faker.lorem.words(2));
};