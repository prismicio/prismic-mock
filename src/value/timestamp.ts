import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

export type MockTimestampValueConfig = {
	after?: Date;
	before?: Date;
} & MockValueConfig;

export const timestamp = (
	config: MockTimestampValueConfig = {},
): prismicT.TimestampField => {
	const faker = createFaker(config.seed);

	const after = config.after || new Date(2012, 0, 1);
	const before = config.before || new Date();

	return faker.date.between(after, before).toISOString();
};
