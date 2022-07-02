import * as prismicT from "@prismicio/types";

import { buildEmbedField } from "../../lib/buildEmbedField";
import { createFaker } from "../../lib/createFaker";
import { getMockEmbedData } from "../../lib/getMockEmbedData";

import { MockRichTextValueConfig } from "../../types";

type MockRichTextEmbedValueConfig = MockRichTextValueConfig;

export const embed = (
	config: MockRichTextEmbedValueConfig = {},
): prismicT.RTEmbedNode | undefined => {
	const faker = config.faker || createFaker(config.seed);

	const data = getMockEmbedData({ faker });
	const embedField = buildEmbedField({ faker, data });

	return {
		type: prismicT.RichTextNodeType.embed,
		oembed: embedField,
	};
};
