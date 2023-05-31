import * as prismic from "@prismicio/client";

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
	[prismic.RichTextNodeType.heading1]: heading,
	[prismic.RichTextNodeType.heading2]: heading,
	[prismic.RichTextNodeType.heading3]: heading,
	[prismic.RichTextNodeType.heading4]: heading,
	[prismic.RichTextNodeType.heading5]: heading,
	[prismic.RichTextNodeType.heading6]: heading,
	[prismic.RichTextNodeType.paragraph]: paragraph,
	[prismic.RichTextNodeType.preformatted]: preformatted,
	[prismic.RichTextNodeType.listItem]: list,
	[prismic.RichTextNodeType.oListItem]: oList,
	[prismic.RichTextNodeType.image]: image,
	[prismic.RichTextNodeType.embed]: embed,
};

export type MockRichTextValueConfig<
	Model extends prismic.CustomTypeModelRichTextField = prismic.CustomTypeModelRichTextField,
	State extends prismic.FieldState = prismic.FieldState,
> = {
	pattern?: keyof typeof patterns;
} & BaseMockRichTextValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockRichTextValue<
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.RichTextField<State>;

export const richText = <
	Model extends prismic.CustomTypeModelRichTextField = prismic.CustomTypeModelRichTextField,
	State extends prismic.FieldState = prismic.FieldState,
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
		const supportsMultipleBlocks = model.config && "multi" in model.config;

		let types: prismic.RTNode["type"][] = [];
		if (model.config) {
			if ("multi" in model.config && model.config.multi) {
				types = model.config.multi
					.split(",")
					.filter((type): type is prismic.RTNode["type"] =>
						Object.keys(generators).includes(type),
					);
			} else if ("single" in model.config && model.config.single) {
				types = model.config.single
					.split(",")
					.filter((type): type is prismic.RTNode["type"] =>
						Object.keys(generators).includes(type),
					);
			}
		}

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
				.filter((block): block is prismic.RTNode => block !== undefined)
				.slice(0, blockCount) as MockRichTextValue<State>;
		} else {
			return [] as MockRichTextValue<State>;
		}
	}
};
