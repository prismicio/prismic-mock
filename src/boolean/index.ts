import * as prismicT from "@prismicio/types";
import * as faker from "faker";

export const boolean = (): prismicT.BooleanField => {
	return faker.datatype.boolean();
};
