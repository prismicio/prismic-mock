import * as prismicT from "@prismicio/types";

import { buildEmbedField } from "../lib/buildEmbedField";
import { getMockEmbedData } from "../lib/getMockEmbedData";

import { IsEmptyMockValueConfig, MockValueConfig } from "../types";

export type MockEmbedValueConfig<
	Model extends prismicT.CustomTypeModelEmbedField = prismicT.CustomTypeModelEmbedField,
	IsEmpty extends boolean = boolean,
> = MockValueConfig<Model> & IsEmptyMockValueConfig<IsEmpty>;

export type MockEmbedValue<IsEmpty extends boolean = boolean> =
	prismicT.EmbedField<IsEmpty>;

export const embed = <
	Model extends prismicT.CustomTypeModelEmbedField = prismicT.CustomTypeModelEmbedField,
	IsEmpty extends boolean = false,
>(
	config: MockEmbedValueConfig<Model, IsEmpty> = {},
): MockEmbedValue<IsEmpty> => {
	const embedData = getMockEmbedData({ seed: config.seed });

	return (
		config.isEmpty ? {} : buildEmbedField({ seed: config.seed, embedData })
	) as prismicT.EmbedField<IsEmpty>;
};
