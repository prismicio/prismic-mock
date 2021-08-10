import * as prismicT from "@prismicio/types";

import { buildEmbedField } from "../lib/buildEmbedField";
import { getRandomEmbedData } from "../lib/getRandomEmbedData";

import { MockValueConfig } from "../types";

export type MockEmbedValueConfig<
	Model extends prismicT.CustomTypeModelEmbedField = prismicT.CustomTypeModelEmbedField,
> = MockValueConfig<Model>;

export const embed = (
	config: MockEmbedValueConfig = {},
): prismicT.EmbedField => {
	const embedData = getRandomEmbedData({ seed: config.seed });

	return buildEmbedField({ seed: config.seed, embedData });
};
