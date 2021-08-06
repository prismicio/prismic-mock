import * as prismicT from "@prismicio/types";

import { MockTimestampValueConfig, timestamp } from "./timestamp";

type MockDateValueConfig = MockTimestampValueConfig;

export const date = (config: MockDateValueConfig = {}): prismicT.DateField => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return timestamp(config)!.split("T")[0];
};
