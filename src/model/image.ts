import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

type ImageArgs = {
	withConstraint?: boolean;
	thumbnailsCount?: number;
};

export const image = (
	args: ImageArgs = {},
): prismicT.CustomTypeModelImageField => {
	return {
		type: prismicT.CustomTypeModelFieldType.Image,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			constraint: {
				width: args.withConstraint
					? faker.datatype.number({ min: 500, max: 2000 })
					: null,
				height: args.withConstraint
					? faker.datatype.number({ min: 500, max: 2000 })
					: null,
			},
			thumbnails: Array(args.thumbnailsCount)
				.fill(undefined)
				.map(() => ({
					name: changeCase.capitalCase(faker.company.bsNoun()),
					width: faker.datatype.number({ min: 500, max: 2000 }),
					height: faker.datatype.number({ min: 500, max: 2000 }),
				})),
		},
	};
};
