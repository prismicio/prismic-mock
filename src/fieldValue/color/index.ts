import * as prismicT from "@prismicio/types";
import * as faker from "faker/locale/en_US";

export const color = (): prismicT.ColorField => {
	return faker.internet.color() as prismicT.ColorField;
};
