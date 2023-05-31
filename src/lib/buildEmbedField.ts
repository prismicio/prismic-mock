import * as prismic from "@prismicio/client";

import { createFaker, Faker } from "../lib/createFaker";

import { Seed } from "../types";

type BuildEmbedFieldConfig<Data extends prismic.AnyOEmbed = prismic.AnyOEmbed> =
	{
		url?: string;
		html?: string;
		data: Data;
	} & (
		| {
				seed: Seed;
				faker?: never;
		  }
		| {
				faker: Faker;
				seed?: never;
		  }
	);

export const buildEmbedField = <
	Data extends prismic.AnyOEmbed = prismic.AnyOEmbed,
>(
	config: BuildEmbedFieldConfig<Data>,
): prismic.EmbedField<Data, "filled"> => {
	const faker = config.faker || createFaker(config.seed);

	return {
		embed_url: config.url ?? faker.url(),
		html: `<div>embed html</div>`,
		...config.data,
	} as prismic.EmbedField<Data, "filled">;
};
