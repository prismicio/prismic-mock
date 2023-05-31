import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

export type MockUIDValueConfig<
	Model extends prismic.CustomTypeModelUIDField = prismic.CustomTypeModelUIDField,
> = MockValueConfig<Model>;

export const uid = <
	Model extends prismic.CustomTypeModelUIDField = prismic.CustomTypeModelUIDField,
>(
	config: MockUIDValueConfig<Model>,
): NonNullable<prismic.PrismicDocument["uid"]> => {
	const faker = config.faker || createFaker(config.seed);

	return changeCase.snakeCase(faker.words(faker.range(1, 3)));
};
