import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

type MockImageModelConfig = {
	withConstraint?: boolean;
	thumbnailsCount?: number;
} & MockModelConfig;

export const image = (
	config: MockImageModelConfig = {},
): prismicT.CustomTypeModelImageField => {
	const faker = createFaker(config.seed);

	const thumbnailsCount = config.thumbnailsCount ?? faker.datatype.number(3);

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
			thumbnails: Array(thumbnailsCount)
				.fill(undefined)
				.map(() => ({
					name: changeCase.pascalCase(faker.company.bsNoun()),
					width: faker.datatype.number({ min: 500, max: 2000 }),
					height: faker.datatype.number({ min: 500, max: 2000 }),
				})),
		},
	};
};
