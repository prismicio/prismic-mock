import * as prismicT from "@prismicio/types";

import { createFaker } from "../../lib/createFaker";

import { MockRichTextValueConfig as BaseMockRichTextValueConfig } from "../../types";

import * as modelGen from "../../model";
import { heading } from "./heading";
import { paragraph } from "./paragraph";
import { preformatted } from "./preformatted";
import { list } from "./list";
import { oList } from "./oList";
import { image } from "./image";
import { embed } from "./embed";

const patterns = {
	short: {
		blockCountMin: 1,
		blockCountMax: 2,
	},
	medium: {
		blockCountMin: 2,
		blockCountMax: 4,
	},
	long: {
		blockCountMin: 4,
		blockCountMax: 8,
	},
} as const;

export type MockRichTextValueConfig = {
	pattern?: keyof typeof patterns;
} & BaseMockRichTextValueConfig<prismicT.CustomTypeModelRichTextField>;

const generators = {
	[prismicT.RichTextNodeType.heading1]: heading,
	[prismicT.RichTextNodeType.heading2]: heading,
	[prismicT.RichTextNodeType.heading3]: heading,
	[prismicT.RichTextNodeType.heading4]: heading,
	[prismicT.RichTextNodeType.heading5]: heading,
	[prismicT.RichTextNodeType.heading6]: heading,
	[prismicT.RichTextNodeType.paragraph]: paragraph,
	[prismicT.RichTextNodeType.preformatted]: preformatted,
	[prismicT.RichTextNodeType.listItem]: list,
	[prismicT.RichTextNodeType.oListItem]: oList,
	[prismicT.RichTextNodeType.image]: image,
	[prismicT.RichTextNodeType.embed]: embed,
};

export const richText = (
	config: MockRichTextValueConfig = {},
): prismicT.RichTextField => {
	const faker = createFaker(config.seed);

	const model =
		config.model ||
		modelGen.richText({
			seed: config.seed,
			withMultipleBlocks: true,
		});
	const supportsMultipleBlocks = "multi" in model.config;
	const types = (
		"multi" in model.config ? model.config.multi : model.config.single
	)
		.split(",")
		.filter((type) =>
			Object.keys(generators).includes(type),
		) as prismicT.RTNode["type"][];

	if (types.length > 0) {
		const patternKey =
			config.pattern ||
			faker.random.arrayElement(
				Object.keys(patterns) as (keyof typeof patterns)[],
			);
		const pattern = patterns[patternKey];

		const blockCount = supportsMultipleBlocks
			? faker.datatype.number({
					min: pattern.blockCountMin,
					max: pattern.blockCountMax,
			  })
			: 1;

		return Array(blockCount)
			.fill(undefined)
			.map(() => {
				const type = faker.random.arrayElement(types);
				const generator = generators[type];

				return generator({ seed: config.seed, model });
			})
			.flat()
			.filter((block): block is prismicT.RTNode => block !== undefined)
			.slice(0, blockCount);
	} else {
		return [];
	}
};
