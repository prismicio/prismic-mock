import * as prismicT from "@prismicio/types";

import { mockForFieldConfigMap } from "../mockForFieldConfigMap";

export const group = (
	fields: prismicT.CustomTypeModelGroupField["config"]["fields"] = {},
	itemCount = Math.floor(Math.random() * 7),
): prismicT.GroupField => {
	return Array(itemCount)
		.fill(undefined)
		.map(() => mockForFieldConfigMap(fields));
};
