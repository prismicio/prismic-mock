import * as prismicT from "@prismicio/types";

import { MockValueConfig, ModelValueMap } from "../types";
import { fieldForGroupModelValue } from "./fieldForGroupModelValue";

type FieldForGroupModelValueMapConfig<
	ModelMap extends Record<string, prismicT.CustomTypeModelFieldForGroup>,
> = {
	map: ModelMap;
} & Omit<MockValueConfig, "model">;

export const fieldForGroupModelValueMap = <
	ModelMap extends Record<string, prismicT.CustomTypeModelFieldForGroup>,
>(
	config: FieldForGroupModelValueMapConfig<ModelMap>,
): ModelValueMap<ModelMap> => {
	const result = {} as ModelValueMap<ModelMap>;

	for (const fieldId in config.map) {
		result[fieldId] = fieldForGroupModelValue({
			seed: config.seed,
			model: config.map[fieldId],
		});
	}

	return result;
};
