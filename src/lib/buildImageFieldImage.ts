import * as prismic from "@prismicio/client";

import { sentenceCase } from "../lib/changeCase";
import { createFaker, Faker } from "../lib/createFaker";

import { MockValueStateConfig, MockImageData, Seed } from "../types";

type BuildImageFieldConfig<
	State extends prismic.FieldState = prismic.FieldState,
> = {
	imageData: MockImageData;
	constraint?: NonNullable<
		prismic.CustomTypeModelImageField["config"]
	>["constraint"];
} & (
	| {
			seed: Seed;
			faker?: never;
	  }
	| {
			faker: Faker;
			seed?: never;
	  }
) &
	Pick<MockValueStateConfig<State>, "state">;

export const buildImageFieldImage = <
	State extends prismic.FieldState = prismic.FieldState,
>(
	config: BuildImageFieldConfig<State>,
): prismic.ImageFieldImage<State> => {
	if (config.state === "empty") {
		return {
			id: null,
			url: null,
			dimensions: null,
			alt: null,
			copyright: null,
		} as prismic.ImageFieldImage<State>;
	} else {
		const faker = config.faker || createFaker(config.seed);

		const url = new URL(config.imageData.url);

		const dimensions = {
			width: config.constraint?.width ?? config.imageData.width,
			height: config.constraint?.height ?? config.imageData.height,
		};

		url.searchParams.set("w", dimensions.width.toString());
		url.searchParams.set("h", dimensions.height.toString());
		url.searchParams.set("fit", "crop");

		return {
			id: faker.hash(11),
			url: url.toString(),
			dimensions,
			alt: sentenceCase(faker.words(faker.range(5, 15))),
			copyright: sentenceCase(faker.words(faker.range(5, 15))),
			edit: {
				x: faker.range(-dimensions.width / 2, dimensions.width / 2),
				y: faker.range(-dimensions.width / 2, dimensions.height / 2),
				zoom: faker.rangeFloat(1, 2),
				background: faker.hexColor(),
			},
		} as prismic.ImageFieldImage<State>;
	}
};
