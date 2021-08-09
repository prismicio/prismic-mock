import * as prismicT from "@prismicio/types";

import { buildEmbedField } from "../../lib/buildEmbedField";
import { getRandomEmbedData } from "../../lib/getRandomEmbedData";

import { MockRichTextValueConfig } from "../../types";

type MockRichTextEmbedValueConfig = MockRichTextValueConfig;

export const embed = (
	config: MockRichTextEmbedValueConfig = {},
): prismicT.RTEmbedNode | undefined => {
	const embedData = getRandomEmbedData({ seed: config.seed });
	const embedField = buildEmbedField({ seed: config.seed, embedData });

	return {
		type: prismicT.RichTextNodeType.embed,
		oembed: embedField,
	};
};
