import * as prismicT from "@prismicio/types";

import { generateTags } from "../lib/generateTags";

import { MockRestApiConfig } from "../types";

export type MockRestApiTagsConfig = MockRestApiConfig;

export const tags = (config: MockRestApiTagsConfig = {}): prismicT.Tags => {
	return generateTags({
		seed: config.seed,
		min: 1,
		max: 10,
	});
};
