import * as prismicT from "@prismicio/types";
import { mockForFieldConfig } from "./mockForFieldConfig";

import { CustomTypeModelFieldValueMap } from "./types";

export const mockForFieldConfigMap = <
	T extends Record<string, prismicT.CustomTypeModelField>,
>(
	fieldConfigMap: T,
): CustomTypeModelFieldValueMap<T> => {
	const result = {} as CustomTypeModelFieldValueMap<T>;

	for (const fieldId in fieldConfigMap) {
		result[fieldId] = mockForFieldConfig(fieldConfigMap[fieldId]);
	}

	return result;
};
