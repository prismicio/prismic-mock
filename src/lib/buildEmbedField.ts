import * as prismicT from "@prismicio/types";

import { createFaker, Faker } from "../lib/createFaker";

import { Seed } from "../types";

type BuildEmbedFieldConfig<
	Data extends prismicT.AnyOEmbed = prismicT.AnyOEmbed,
> = {
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
	Data extends prismicT.AnyOEmbed = prismicT.AnyOEmbed,
>(
	config: BuildEmbedFieldConfig<Data>,
): prismicT.EmbedField<Data, "filled"> => {
	const faker = config.faker || createFaker(config.seed);

	return {
		embed_url: config.url ?? faker.url(),
		html: `<div>embed html</div>`,
		...config.data,
	} as prismicT.EmbedField<Data, "filled">;
};
