import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";
import { generateTags } from "../lib/generateTags";

import { MockRestApiConfig } from "../types";

export type MockRestApiTagsConfig = MockRestApiConfig;

export const tags = (config: MockRestApiTagsConfig): prismicT.Tags => {
	const faker = config.faker || createFaker(config.seed);

	return generateTags({
		faker,
		min: 1,
		max: 10,
	});
};
