import * as prismicT from "@prismicio/types";

import { MockValueStateConfig, MockValueConfig } from "../types";

import { MockTimestampValueConfig, timestamp } from "./timestamp";

export type MockDateValueConfig<
	Model extends prismicT.CustomTypeModelDateField = prismicT.CustomTypeModelDateField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = Pick<MockTimestampValueConfig, "after" | "before"> &
	MockValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockDateValue<
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.DateField<State>;

export const date = <
	Model extends prismicT.CustomTypeModelDateField = prismicT.CustomTypeModelDateField,
	State extends prismicT.FieldState = "filled",
>(
	config: MockDateValueConfig<Model, State> = {},
): MockDateValue<State> => {
	return (
		config.state === "empty"
			? null
			: timestamp({
					seed: config.seed,
					after: config.after,
					before: config.before,
					state: "filled",
			  }).split("T")[0]
	) as MockDateValue<State>;
};
