import * as prismic from "@prismicio/client";

import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

import { MockTimestampValueConfig, timestamp } from "./timestamp";

export type MockDateValueConfig<
	Model extends prismic.CustomTypeModelDateField = prismic.CustomTypeModelDateField,
	State extends prismic.FieldState = prismic.FieldState,
> = Pick<MockTimestampValueConfig, "after" | "before"> &
	MockValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockDateValue<
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.DateField<State>;

export const date = <
	Model extends prismic.CustomTypeModelDateField = prismic.CustomTypeModelDateField,
	State extends prismic.FieldState = "filled",
>(
	config: MockDateValueConfig<Model, State>,
): MockDateValue<State> => {
	const faker = config.faker || createFaker(config.seed);

	return (
		config.state === "empty"
			? null
			: timestamp({
					faker,
					after: config.after,
					before: config.before,
					state: "filled",
			  }).split("T")[0]
	) as MockDateValue<State>;
};
