import * as prismicT from "@prismicio/types";

import { MockValueConfig } from "../types";

import { MockTimestampValueConfig, timestamp } from "./timestamp";

export type MockDateValueConfig<
	Model extends prismicT.CustomTypeModelDateField = prismicT.CustomTypeModelDateField,
> = Pick<MockTimestampValueConfig, "after" | "before"> & MockValueConfig<Model>;

export const date = (config: MockDateValueConfig = {}): prismicT.DateField => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return timestamp({
		seed: config.seed,
		after: config.after,
		before: config.before,
	})!.split("T")[0];
};
