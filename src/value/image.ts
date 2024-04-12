import type * as prismic from "@prismicio/client";
import { type ImageField } from "@prismicio/client";

import { buildImageFieldImage } from "../lib/buildImageFieldImage";
import { createFaker } from "../lib/createFaker";
import { getMockImageData } from "../lib/getMockImageData";

import { MockValueStateConfig, MockValueConfig } from "../types";

import * as modelGen from "../model";

export type MockImageValueConfig<
	Model extends
		prismic.CustomTypeModelImageField = prismic.CustomTypeModelImageField,
	State extends prismic.FieldState = prismic.FieldState,
> = MockValueConfig<Model> & MockValueStateConfig<State>;

export type MockImageValue<
	Model extends
		prismic.CustomTypeModelImageField = prismic.CustomTypeModelImageField,
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.ImageField<
	NonNullable<NonNullable<Model["config"]>["thumbnails"]>[number]["name"],
	State
>;

export const image = <
	Model extends
		prismic.CustomTypeModelImageField = prismic.CustomTypeModelImageField,
	State extends prismic.FieldState = "filled",
>(
	config: MockImageValueConfig<Model, State>,
): ImageField<
	NonNullable<NonNullable<Model["config"]>["thumbnails"]>[number]["name"],
	State
> => {
	const faker = config.faker || createFaker(config.seed);

	const model = config.model || modelGen.image({ faker });
	const imageData = getMockImageData({ faker });

	const value = buildImageFieldImage({
		faker,
		imageData,
		constraint: model.config?.constraint,
		state: config.state,
	}) as MockImageValue<Model, State>;

	if (model.config?.thumbnails) {
		for (const thumbnail of model.config.thumbnails) {
			// TODO: Resolve the following type error
			// @ts-expect-error - Unsure how to fix this type mismatch
			value[thumbnail.name as keyof typeof value] = buildImageFieldImage({
				faker,
				imageData,
				constraint: {
					width: thumbnail.width,
					height: thumbnail.height,
				},
				state: config.state,
			});
		}
	}

	return value;
};
