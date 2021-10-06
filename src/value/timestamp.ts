import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { IsEmptyMockValueConfig, MockValueConfig } from "../types";

export type MockTimestampValueConfig<
	Model extends prismicT.CustomTypeModelTimestampField = prismicT.CustomTypeModelTimestampField,
	IsEmpty extends boolean = boolean,
> = {
	after?: Date;
	before?: Date;
} & MockValueConfig<Model> &
	IsEmptyMockValueConfig<IsEmpty>;

export type MockTimestampValue<IsEmpty extends boolean = boolean> =
	prismicT.TimestampField<IsEmpty>;

export const timestamp = <
	Model extends prismicT.CustomTypeModelTimestampField = prismicT.CustomTypeModelTimestampField,
	IsEmpty extends boolean = false,
>(
	config: MockTimestampValueConfig<Model, IsEmpty> = {},
): MockTimestampValue<IsEmpty> => {
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
		config.isEmpty ? null : faker.date.between(after, before).toISOString()
	) as MockTimestampValue<IsEmpty>;
};
