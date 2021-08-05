import * as prismicT from "@prismicio/types";
import * as faker from "faker";

import { data } from "./data";

type ImageArgs = {
	constraints?: prismicT.CustomTypeModelImageConstraint;
	thumbnails?: prismicT.CustomTypeModelImageField["config"]["thumbnails"];
};

export const image = (args: ImageArgs = {}): prismicT.ImageField => {
	const sampleData = data[Math.floor(Math.random() * data.length)];
	const url = new URL(sampleData.url);

	const dimensions = {
		width: args.constraints?.width ?? sampleData.width,
		height: args.constraints?.height ?? sampleData.height,
	};

	url.searchParams.set("w", dimensions.width.toString());
	url.searchParams.set("h", dimensions.height.toString());
	url.searchParams.set("fit", "crop");

	const thumbnails = {} as Record<string, prismicT.ImageField>;
	for (const thumbnail of args.thumbnails || []) {
		const constraints = {
			width: thumbnail.width,
			height: thumbnail.height,
		};

		thumbnails[thumbnail.name] = image({ constraints });
	}

	return {
		url: url.toString(),
		dimensions,
		alt: faker.lorem.sentence(),
		copyright: faker.lorem.sentence(),
		...thumbnails,
	};
};
