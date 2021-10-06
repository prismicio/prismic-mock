import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockEmbedData, MockValueConfig } from "../types";

type BuildEmbedFieldConfig = {
	embedData: MockEmbedData;
} & Pick<MockValueConfig, "seed">;

export const buildEmbedField = (
	config: BuildEmbedFieldConfig,
): prismicT.EmbedField<false> => {
	const faker = createFaker(config.seed);

	return {
		type: faker.datatype.boolean()
			? prismicT.EmbedType.Link
			: prismicT.EmbedType.Rich,
		url: config.embedData.url,
		html: config.embedData.html,
		title: changeCase.capitalCase(faker.lorem.words(3)),
		version: faker.datatype
			.number({ min: 1, max: 3, precision: 10 })
			.toString(),
		cache_age: faker.datatype.number(),
		embed_url: config.embedData.embed_url,
		author_url: faker.internet.url(),
		author_name: faker.company.companyName(),
		provider_name: faker.company.companyName(),
		thumbnail_width: config.embedData.thumbnail_width,
		thumbnail_height: config.embedData.thumbnail_height,
		thumbnail_url: config.embedData.thumbnail_url,
		width: faker.datatype.number({ min: 200, max: 500 }),
		height: faker.datatype.number({ min: 200, max: 500 }),
	};
};
