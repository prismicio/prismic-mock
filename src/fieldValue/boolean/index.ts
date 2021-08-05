import * as prismicT from "@prismicio/types";
import * as faker from "faker/locale/en_US";

export const boolean = (): prismicT.BooleanField => {
	return faker.datatype.boolean();
};
