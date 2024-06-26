import * as prismic from "@prismicio/client";

import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockTimestampValueConfig<
	Model extends
		prismic.CustomTypeModelTimestampField = prismic.CustomTypeModelTimestampField,
	State extends prismic.FieldState = prismic.FieldState,
> = {
	after?: Date;
	before?: Date;
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockTimestampValue<
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.TimestampField<State>;

export const timestamp = <
	Model extends
		prismic.CustomTypeModelTimestampField = prismic.CustomTypeModelTimestampField,
	State extends prismic.FieldState = "filled",
>(
	config: MockTimestampValueConfig<Model, State>,
): MockTimestampValue<State> => {
	const faker = config.faker || createFaker(config.seed);

	if (config.state === "empty") {
		return null as MockTimestampValue<State>;
	} else {
		let date: Date;

		// Working with Date objects produces non-deterministic values;
		// machines can return different values due to differing
		// timezones and other unknown factors. To get around this, we
		// can can remove time from the given values and only use their dates.
		const after = config.after
			? new Date(config.after.toISOString().split("T")[0])
			: undefined;
		const before = config.before
			? new Date(config.before.toISOString().split("T")[0])
			: undefined;

		if (after && before) {
			date = faker.dateBetween(after, before);
		} else if (after) {
			date = faker.dateAfter(after);
		} else if (before) {
			date = faker.dateBefore(before);
		} else {
			date = faker.date();
		}

		return date.toISOString() as MockTimestampValue<State>;
	}
};
