import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

type MockImageModelConfig<ThumbnailNames extends string = string> = {
	withConstraint?: boolean;
	thumbnailNames?: readonly ThumbnailNames[];
} & MockModelConfig;

export const image = <ThumbnailNames extends string = string>(
	config: MockImageModelConfig<ThumbnailNames> = {},
): prismicT.CustomTypeModelImageField<ThumbnailNames> => {
	const faker = createFaker(config.seed);

	const thumbnails = (config.thumbnailNames || []).map((name) => {
		return {
			name,
			width: faker.datatype.number({ min: 500, max: 2000 }),
			height: faker.datatype.number({ min: 500, max: 2000 }),
		};
	});

	return {
		type: prismicT.CustomTypeModelFieldType.Image,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			constraint: {
				width: config.withConstraint
					? faker.datatype.number({ min: 500, max: 2000 })
					: null,
				height: config.withConstraint
					? faker.datatype.number({ min: 500, max: 2000 })
					: null,
			},
			thumbnails,
		},
	};
};
