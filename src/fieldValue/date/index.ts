import * as prismicT from "@prismicio/types";

import { timestamp } from "../timestamp";

export const date = (): prismicT.DateField => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return timestamp()!.split("T")[0];
};
