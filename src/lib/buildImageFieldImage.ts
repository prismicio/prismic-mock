import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import {
	IsEmptyMockValueConfig,
	MockImageData,
	MockValueConfig,
} from "../types";

type BuildImageFieldConfig<IsEmpty extends boolean = boolean> = {
	imageData: MockImageData;
	constraint?: prismicT.CustomTypeModelImageField["config"]["constraint"];
} & Pick<MockValueConfig, "seed"> &
	Pick<IsEmptyMockValueConfig<IsEmpty>, "isEmpty">;

export const buildImageFieldImage = <IsEmpty extends boolean = boolean>(
	config: BuildImageFieldConfig<IsEmpty>,
): prismicT.ImageFieldImage<IsEmpty> => {
	if (config.isEmpty) {
		return {
			url: null,
			dimensions: null,
			alt: null,
			copyright: null,
		} as prismicT.ImageFieldImage<IsEmpty>;
	} else {
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
		} as prismicT.ImageFieldImage<IsEmpty>;
	}
};
