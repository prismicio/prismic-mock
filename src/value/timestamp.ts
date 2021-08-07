import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

export type MockTimestampValueConfig<
	Model extends prismicT.CustomTypeModelTimestampField = prismicT.CustomTypeModelTimestampField,
> = {
	after?: Date;
	before?: Date;
} & MockValueConfig<Model>;

export const timestamp = (
	config: MockTimestampValueConfig = {},
): prismicT.TimestampField => {
	const faker = createFaker(config.seed);

	// Faker seems to have problems accepting parameters for `faker.date.between`
	// if the parameters are too precise. We can get around this by only using
	// generated dates, not timestamps.
	const after = config.after || faker.date.past().toISOString().split("T")[0];
	const before =
		config.before || faker.date.future().toISOString().split("T")[0];

	return faker.date.between(after, before).toISOString();
};
