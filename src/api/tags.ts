import * as prismic from "@prismicio/client";

import { createFaker } from "../lib/createFaker";
import { generateTags } from "../lib/generateTags";

import { MockRestApiConfig } from "../types";

export type MockRestApiTagsConfig = MockRestApiConfig;

export const tags = (config: MockRestApiTagsConfig): prismic.Tags => {
	const faker = config.faker || createFaker(config.seed);

	return generateTags({
		faker,
		min: 1,
		max: 10,
	});
};
