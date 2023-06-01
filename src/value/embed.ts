import * as prismic from "@prismicio/client";

import { buildEmbedField } from "../lib/buildEmbedField";
import { createFaker } from "../lib/createFaker";
import { getMockEmbedData } from "../lib/getMockEmbedData";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockEmbedValueConfig<
	Model extends prismic.CustomTypeModelEmbedField = prismic.CustomTypeModelEmbedField,
	Data extends prismic.AnyOEmbed = prismic.AnyOEmbed,
	State extends prismic.FieldState = prismic.FieldState,
> = {
	url?: string;
	html?: string;
	data?: Data;
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockEmbedValue<
	Data extends prismic.AnyOEmbed = prismic.AnyOEmbed,
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.EmbedField<Data, State>;

export const embed = <
	Model extends prismic.CustomTypeModelEmbedField = prismic.CustomTypeModelEmbedField,
	Data extends prismic.AnyOEmbed = prismic.AnyOEmbed,
	State extends prismic.FieldState = "filled",
>(
	config: MockEmbedValueConfig<Model, Data, State>,
): MockEmbedValue<Data, State> => {
	const faker = config.faker || createFaker(config.seed);

	const data = config.data ?? getMockEmbedData({ faker });

	return (
		config.state === "empty"
			? {}
			: buildEmbedField({
					faker,
					url: config.url ?? ("embed_url" in data ? data.embed_url : undefined),
					html: config.html ?? ("html" in data ? data.html : undefined),
					data,
			  })
	) as MockEmbedValue<Data, State>;
};
