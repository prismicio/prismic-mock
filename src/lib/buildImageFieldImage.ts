import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker, Faker } from "../lib/createFaker";

import { MockValueStateConfig, MockImageData, Seed } from "../types";

type BuildImageFieldConfig<
	State extends prismicT.FieldState = prismicT.FieldState,
> = {
	imageData: MockImageData;
	constraint?: NonNullable<
		prismicT.CustomTypeModelImageField["config"]
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
	State extends prismicT.FieldState = prismicT.FieldState,
>(
	config: BuildImageFieldConfig<State>,
): prismicT.ImageFieldImage<State> => {
	if (config.state === "empty") {
		return {
			url: null,
			dimensions: null,
			alt: null,
			copyright: null,
		} as prismicT.ImageFieldImage<State>;
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
			url: url.toString(),
			dimensions,
			alt: changeCase.sentenceCase(faker.words(faker.range(5, 15))),
			copyright: changeCase.sentenceCase(faker.words(faker.range(5, 15))),
		} as prismicT.ImageFieldImage<State>;
	}
};
