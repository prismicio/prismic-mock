import * as prismicT from "@prismicio/types";

import { buildImageFieldImage } from "../lib/buildImageFieldImage";
import { createFaker } from "../lib/createFaker";
import { getMockImageData } from "../lib/getMockImageData";

import { MockValueStateConfig, MockValueConfig } from "../types";

import * as modelGen from "../model";

export type MockImageValueConfig<
	Model extends prismicT.CustomTypeModelImageField = prismicT.CustomTypeModelImageField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = MockValueConfig<Model> & MockValueStateConfig<State>;

export type MockImageValue<
	Model extends prismicT.CustomTypeModelImageField = prismicT.CustomTypeModelImageField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.ImageField<Model["config"]["thumbnails"][number]["name"], State>;

export const image = <
	Model extends prismicT.CustomTypeModelImageField = prismicT.CustomTypeModelImageField,
	State extends prismicT.FieldState = "filled",
>(
	config: MockImageValueConfig<Model, State> = {},
): MockImageValue<Model, State> => {
	const faker = config.faker || createFaker(config.seed);

	const model = config.model || modelGen.image({ faker });
	const imageData = getMockImageData({ faker });

	const value = buildImageFieldImage({
		faker,
		imageData,
		constraint: model.config.constraint,
		state: config.state,
	}) as MockImageValue<Model, State>;

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

	return value;
};
