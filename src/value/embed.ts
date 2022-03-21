import * as prismicT from "@prismicio/types";

import { buildEmbedField } from "../lib/buildEmbedField";
import { getMockEmbedData } from "../lib/getMockEmbedData";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockEmbedValueConfig<
	Model extends prismicT.CustomTypeModelEmbedField = prismicT.CustomTypeModelEmbedField,
	Data extends prismicT.AnyOEmbed = prismicT.AnyOEmbed,
	State extends prismicT.FieldState = prismicT.FieldState,
> = {
	url?: string;
	html?: string;
	data?: Data;
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockEmbedValue<
	Data extends prismicT.AnyOEmbed = prismicT.AnyOEmbed,
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.EmbedField<Data, State>;

export const embed = <
	Model extends prismicT.CustomTypeModelEmbedField = prismicT.CustomTypeModelEmbedField,
	Data extends prismicT.AnyOEmbed = prismicT.AnyOEmbed,
	State extends prismicT.FieldState = "filled",
>(
	config: MockEmbedValueConfig<Model, Data, State> = {},
): MockEmbedValue<Data, State> => {
	const data = config.data ?? getMockEmbedData({ seed: config.seed });

	return (
		config.state === "empty"
			? {}
			: buildEmbedField({
					seed: config.seed,
					url: config.url ?? ("embed_url" in data ? data.embed_url : undefined),
					html: config.html ?? ("html" in data ? data.html : undefined),
					data,
			  })
	) as MockEmbedValue<Data, State>;
};
