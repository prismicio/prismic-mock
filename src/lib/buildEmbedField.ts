import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

type BuildEmbedFieldConfig<
	Data extends prismicT.AnyOEmbed = prismicT.AnyOEmbed,
> = {
	url?: string;
	html?: string;
	data: Data;
} & Pick<MockValueConfig, "faker" | "seed">;

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
