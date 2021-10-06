import * as prismicT from "@prismicio/types";

import { buildImageFieldImage } from "../../lib/buildImageFieldImage";
import { getMockImageData } from "../../lib/getMockImageData";

import { MockRichTextValueConfig } from "../../types";

type MockRichTextImageValueConfig = MockRichTextValueConfig;

export const image = (
	config: MockRichTextImageValueConfig = {},
): prismicT.RTImageNode | undefined => {
	const imageData = getMockImageData({ seed: config.seed });
	const imageField = buildImageFieldImage({
		seed: config.seed,
		imageData,
		isEmpty: false,
	});

	return {
		type: prismicT.RichTextNodeType.image,
		alt: imageField.alt,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		url: imageField.url!,
		copyright: imageField.copyright,
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		dimensions: imageField.dimensions!,
	};
};
