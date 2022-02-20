import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockTimestampValueConfig<
	Model extends prismicT.CustomTypeModelTimestampField = prismicT.CustomTypeModelTimestampField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = {
	after?: Date;
	before?: Date;
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockTimestampValue<
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.TimestampField<State>;

export const timestamp = <
	Model extends prismicT.CustomTypeModelTimestampField = prismicT.CustomTypeModelTimestampField,
	State extends prismicT.FieldState = "filled",
>(
	config: MockTimestampValueConfig<Model, State> = {},
): MockTimestampValue<State> => {
	const faker = createFaker(config.seed);

	if (config.state === "empty") {
		return null as MockTimestampValue<State>;
	} else {
		let date: Date;

		if (config.after && config.before) {
			date = faker.dateBetween(config.after, config.before);
		} else if (config.after) {
			date = faker.dateAfter(config.after);
		} else if (config.before) {
			date = faker.dateBefore(config.before);
		} else {
			date = faker.date();
		}

		return date.toISOString() as MockTimestampValue<State>;
	}
};
