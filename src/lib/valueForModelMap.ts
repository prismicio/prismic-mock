import * as prismicT from "@prismicio/types";

import { MockValueConfig, ModelValueMap } from "../types";

import { valueForModel } from "./valueForModel";

type FieldForGroupModelValueMapConfig<
	ModelMap extends Record<string, prismicT.CustomTypeModelField>,
> = {
	map: ModelMap;
} & Omit<MockValueConfig, "model">;

export const valueForModelMap = <
	ModelMap extends Record<string, prismicT.CustomTypeModelField>,
>(
	config: FieldForGroupModelValueMapConfig<ModelMap>,
): ModelValueMap<ModelMap> => {
	const result = {} as ModelValueMap<ModelMap>;

	for (const fieldId in config.map) {
		result[fieldId] = valueForModel({
			seed: config.seed,
			model: config.map[fieldId],
		});
	}

	return result;
};
