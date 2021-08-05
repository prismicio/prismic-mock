import * as prismicT from "@prismicio/types";
import * as faker from "faker";

export const timestamp = (
	start = new Date(2012, 0, 1),
	end = new Date(),
): prismicT.TimestampField => {
	return faker.date.between(start, end).toISOString();
};
