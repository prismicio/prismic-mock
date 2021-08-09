import * as prismicT from "@prismicio/types";

import { buildImageField } from "../../lib/buildImageField";
import { getRandomImageData } from "../../lib/getRandomImageData";

import { MockRichTextValueConfig } from "../../types";

type MockRichTextImageValueConfig = MockRichTextValueConfig;

export const image = (
	config: MockRichTextImageValueConfig = {},
): prismicT.RTImageNode | undefined => {
	const imageData = getRandomImageData({ seed: config.seed });
	const imageField = buildImageField({ seed: config.seed, imageData });

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
