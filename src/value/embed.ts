import * as prismicT from "@prismicio/types";

import { buildEmbedField } from "../lib/buildEmbedField";
import { getMockEmbedData } from "../lib/getMockEmbedData";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockEmbedValueConfig<
	Model extends prismicT.CustomTypeModelEmbedField = prismicT.CustomTypeModelEmbedField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = MockValueConfig<Model> & MockValueStateConfig<State>;

export type MockEmbedValue<
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.EmbedField<State>;

export const embed = <
	Model extends prismicT.CustomTypeModelEmbedField = prismicT.CustomTypeModelEmbedField,
	State extends prismicT.FieldState = "filled",
>(
	config: MockEmbedValueConfig<Model, State> = {},
): MockEmbedValue<State> => {
	const embedData = getMockEmbedData({ seed: config.seed });

	return (
		config.state ? {} : buildEmbedField({ seed: config.seed, embedData })
	) as prismicT.EmbedField<State>;
};
