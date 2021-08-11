import * as prismicT from "@prismicio/types";

import { buildEmbedField } from "../lib/buildEmbedField";
import { getMockEmbedData } from "../lib/getMockEmbedData";

import { MockValueConfig } from "../types";

export type MockEmbedValueConfig<
	Model extends prismicT.CustomTypeModelEmbedField = prismicT.CustomTypeModelEmbedField,
> = MockValueConfig<Model>;

export const embed = (
	config: MockEmbedValueConfig = {},
): prismicT.EmbedField => {
	const embedData = getMockEmbedData({ seed: config.seed });

	return buildEmbedField({ seed: config.seed, embedData });
};
