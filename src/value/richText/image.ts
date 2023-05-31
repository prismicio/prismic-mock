import * as prismic from "@prismicio/client";

import { buildImageFieldImage } from "../../lib/buildImageFieldImage";
import { createFaker } from "../../lib/createFaker";
import { getMockImageData } from "../../lib/getMockImageData";

import { MockRichTextValueConfig } from "../../types";

type MockRichTextImageValueConfig = MockRichTextValueConfig;

export const image = (
	config: MockRichTextImageValueConfig,
): prismic.RTImageNode | undefined => {
	const faker = config.faker || createFaker(config.seed);

	const imageData = getMockImageData({ faker });
	const imageField = buildImageFieldImage({
		faker,
		imageData,
		state: "filled",
	});

	return {
		type: prismic.RichTextNodeType.image,
		alt: imageField.alt,
		url: imageField.url,
		copyright: imageField.copyright,
		dimensions: imageField.dimensions,
	};
};
