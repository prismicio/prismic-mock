import * as prismicT from "@prismicio/types";

import { IsEmptyMockValueConfig, MockValueConfig } from "../types";

import { MockTimestampValueConfig, timestamp } from "./timestamp";

export type MockDateValueConfig<
	Model extends prismicT.CustomTypeModelDateField = prismicT.CustomTypeModelDateField,
	IsEmpty extends boolean = boolean,
> = Pick<MockTimestampValueConfig, "after" | "before"> &
	MockValueConfig<Model> &
	IsEmptyMockValueConfig<IsEmpty>;

export type MockDateValue<IsEmpty extends boolean = boolean> =
	prismicT.DateField<IsEmpty>;

export const date = <
	Model extends prismicT.CustomTypeModelDateField = prismicT.CustomTypeModelDateField,
	IsEmpty extends boolean = false,
>(
	config: MockDateValueConfig<Model, IsEmpty> = {},
): MockDateValue<IsEmpty> => {
	return (
		config.isEmpty
			? null
			: timestamp({
					seed: config.seed,
					after: config.after,
					before: config.before,
					isEmpty: false,
			  }).split("T")[0]
	) as MockDateValue<IsEmpty>;
};
