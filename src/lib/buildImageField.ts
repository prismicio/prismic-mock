import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockImageData, MockValueConfig } from "../types";

type BuildImageFieldConfig = {
	imageData: MockImageData;
	constraint?: prismicT.CustomTypeModelImageField["config"]["constraint"];
} & Pick<MockValueConfig, "seed">;

export const buildImageField = (
	config: BuildImageFieldConfig,
): prismicT.ImageField => {
	const faker = createFaker(config.seed);

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
		alt: faker.lorem.sentence(),
		copyright: faker.lorem.sentence(),
	};
};
