import * as prismicT from "@prismicio/types";
import * as faker from "faker";

export const number = (): prismicT.NumberField => {
	return faker.datatype.number();
};
