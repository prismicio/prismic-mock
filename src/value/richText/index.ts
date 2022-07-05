import * as prismicT from "@prismicio/types";

import { createFaker } from "../../lib/createFaker";

import {
	MockRichTextValueConfig as BaseMockRichTextValueConfig,
	MockValueStateConfig,
} from "../../types";

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

export type MockRichTextValueConfig<
	Model extends prismicT.CustomTypeModelRichTextField = prismicT.CustomTypeModelRichTextField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = {
	pattern?: keyof typeof patterns;
} & BaseMockRichTextValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockRichTextValue<
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.RichTextField<State>;

export const richText = <
	Model extends prismicT.CustomTypeModelRichTextField = prismicT.CustomTypeModelRichTextField,
	State extends prismicT.FieldState = prismicT.FieldState,
>(
	config: MockRichTextValueConfig<Model, State>,
): MockRichTextValue<State> => {
	const faker = config.faker || createFaker(config.seed);

	if (config.state === "empty") {
		return [] as MockRichTextValue<State>;
	} else {
		const model =
			config.model ||
			modelGen.richText({
				faker,
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
				faker.randomElement(Object.keys(patterns) as (keyof typeof patterns)[]);
			const pattern = patterns[patternKey];

			const blockCount = supportsMultipleBlocks
				? faker.range(pattern.blockCountMin, pattern.blockCountMax)
				: 1;

			return Array(blockCount)
				.fill(undefined)
				.map(() => {
					const type = faker.randomElement(types);
					const generator = generators[type];

					return generator({ faker, model });
				})
				.flat()
				.filter((block): block is prismicT.RTNode => block !== undefined)
				.slice(0, blockCount) as MockRichTextValue<State>;
		} else {
			return [] as MockRichTextValue<State>;
		}
	}
};
