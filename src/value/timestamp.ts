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

	// Faker seems to have problems accepting parameters for `faker.date.between`
	// if the parameters are too precise. We can get around this by only using
	// generated dates, not timestamps.
	const after =
		config.after ||
		faker.date.past(20, new Date("2021-03-07")).toISOString().split("T")[0];
	const before =
		config.before ||
		faker.date.future(20, new Date("2021-03-07")).toISOString().split("T")[0];

	return (
		config.state ? null : faker.date.between(after, before).toISOString()
	) as MockTimestampValue<State>;
};
