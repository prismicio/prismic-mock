import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

export type MockUIDValueConfig<
	Model extends prismicT.CustomTypeModelUIDField = prismicT.CustomTypeModelUIDField,
> = MockValueConfig<Model>;

export const uid = <
	Model extends prismicT.CustomTypeModelUIDField = prismicT.CustomTypeModelUIDField,
>(
	config: MockUIDValueConfig<Model> = {},
): NonNullable<prismicT.PrismicDocument["uid"]> => {
	const faker = config.faker || createFaker(config.seed);

	return changeCase.snakeCase(faker.words(faker.range(1, 3)));
};
