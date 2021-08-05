import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

export const uid = (): prismicT.PrismicDocument["uid"] => {
	return changeCase.snakeCase(faker.lorem.words(2));
};
