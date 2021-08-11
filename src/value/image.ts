import * as prismicT from "@prismicio/types";

import { MockValueConfig } from "../types";

import { buildImageField } from "../lib/buildImageField";
import { getMockImageData } from "../lib/getMockImageData";

import * as modelGen from "../model";

export type MockImageValueConfig<
	Model extends prismicT.CustomTypeModelImageField = prismicT.CustomTypeModelImageField,
> = MockValueConfig<Model>;

export const image = (
	config: MockImageValueConfig = {},
): prismicT.ImageField => {
	const model = config.model || modelGen.image({ seed: config.seed });
	const imageData = getMockImageData({ seed: config.seed });

	const value = buildImageField({
		seed: config.seed,
		imageData,
		constraint: model.config.constraint,
	});

	for (const thumbnail of model.config.thumbnails) {
		value[thumbnail.name] = buildImageField({
			seed: config.seed,
			imageData,
			constraint: {
				width: thumbnail.width,
				height: thumbnail.height,
			},
		});
	}

	return value;
};
