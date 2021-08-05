import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

export const text = (): prismicT.KeyTextField => {
	return changeCase.sentenceCase(faker.lorem.words(3));
};
