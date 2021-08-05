import * as prismicT from "@prismicio/types";

import { data } from "./data";

export const embed = (): prismicT.EmbedField => {
	return data[Math.floor(Math.random() * data.length)].oembed;
};
