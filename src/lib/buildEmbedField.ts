import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockEmbedData, MockValueConfig } from "../types";

type BuildEmbedFieldConfig = {
	embedData: MockEmbedData;
} & Pick<MockValueConfig, "seed">;

export const buildEmbedField = (
	config: BuildEmbedFieldConfig,
): prismicT.EmbedField<MockEmbedData, "filled"> => {
	const faker = createFaker(config.seed);

	return {
		type: faker.boolean() ? prismicT.EmbedType.Link : prismicT.EmbedType.Rich,
		url: config.embedData.url,
		html: config.embedData.html,
		title: changeCase.capitalCase(faker.words(faker.range(1, 3))),
		version: faker.range(1, 3).toString(),
		cache_age: faker.range(10000, 40000),
		embed_url: config.embedData.embed_url,
		author_url: faker.url(),
		author_name: changeCase.capitalCase(faker.words(2)),
		provider_name: changeCase.capitalCase(faker.words(faker.range(1, 2))),
		thumbnail_width: config.embedData.thumbnail_width,
		thumbnail_height: config.embedData.thumbnail_height,
		thumbnail_url: config.embedData.thumbnail_url,
		width: faker.range(200, 500),
		height: faker.range(200, 500),
	};
};
