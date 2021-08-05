import * as prismicT from "@prismicio/types";
import * as faker from "faker/locale/en_US";

export const number = (): prismicT.NumberField => {
	return faker.datatype.number();
};
