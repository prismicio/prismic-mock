import * as prismicT from "@prismicio/types";

import { buildImageFieldImage } from "../lib/buildImageFieldImage";
import { getMockImageData } from "../lib/getMockImageData";

import { IsEmptyMockValueConfig, MockValueConfig } from "../types";

import * as modelGen from "../model";

export type MockImageValueConfig<
	Model extends prismicT.CustomTypeModelImageField = prismicT.CustomTypeModelImageField,
	IsEmpty extends boolean = boolean,
> = MockValueConfig<Model> & IsEmptyMockValueConfig<IsEmpty>;

export type MockImageValue<
	Model extends prismicT.CustomTypeModelImageField = prismicT.CustomTypeModelImageField,
	IsEmpty extends boolean = boolean,
> = prismicT.ImageField<Model["config"]["thumbnails"][number]["name"], IsEmpty>;

export const image = <
	Model extends prismicT.CustomTypeModelImageField = prismicT.CustomTypeModelImageField,
	IsEmpty extends boolean = false,
>(
	config: MockImageValueConfig<Model, IsEmpty> = {},
): MockImageValue<Model, IsEmpty> => {
	const model = config.model || modelGen.image({ seed: config.seed });
	const imageData = getMockImageData({ seed: config.seed });

	const value = buildImageFieldImage({
		seed: config.seed,
		imageData,
		constraint: model.config.constraint,
		isEmpty: config.isEmpty,
	}) as MockImageValue<Model, IsEmpty>;

	for (const thumbnail of model.config.thumbnails) {
		// TODO: Resolve the following type error
		// @ts-expect-error - Unsure how to fix this type mismatch
		value[thumbnail.name as keyof typeof value] = buildImageFieldImage({
			seed: config.seed,
			imageData,
			constraint: {
				width: thumbnail.width,
				height: thumbnail.height,
			},
			isEmpty: config.isEmpty,
		});
	}

	return value;
};
