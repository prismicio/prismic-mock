import * as prismicT from "@prismicio/types";
import { mockForFieldConfig } from "./mockForFieldConfig";

import { ModelValueMap } from "./types";

export const mockForFieldConfigMap = <
	T extends Record<string, prismicT.CustomTypeModelField>,
>(
	fieldConfigMap: T,
): ModelValueMap<T> => {
	const result = {} as ModelValueMap<T>;

	for (const fieldId in fieldConfigMap) {
		result[fieldId] = mockForFieldConfig(fieldConfigMap[fieldId]);
	}

	return result;
};
