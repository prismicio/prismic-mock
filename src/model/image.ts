import * as prismic from "@prismicio/client";

import { capitalCase } from "../lib/changeCase";
import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockImageModelConfig<ThumbnailNames extends string = string> = {
	withConstraint?: boolean;
	thumbnailNames?: readonly ThumbnailNames[];
} & MockModelConfig;

export const image = <ThumbnailNames extends string = string>(
	config: MockImageModelConfig<ThumbnailNames>,
): prismic.CustomTypeModelImageField<ThumbnailNames> => {
	const faker = config.faker || createFaker(config.seed);

	const thumbnails = (config.thumbnailNames || []).map((name) => {
		return {
			name,
			width: faker.range(500, 2000),
			height: faker.range(500, 2000),
		};
	});

	return {
		type: prismic.CustomTypeModelFieldType.Image,
		config: {
			label: capitalCase(faker.word()),
			constraint: {
				width: config.withConstraint ? faker.range(500, 2000) : null,
				height: config.withConstraint ? faker.range(500, 2000) : null,
			},
			thumbnails,
		},
	};
};
