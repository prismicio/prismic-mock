import * as prismicT from "@prismicio/types";

import { MockValueConfig } from "../types";

import { heading, MockRichTextHeadingValueConfig } from "./richText/heading";

export type MockTitleValueConfig<
	Model extends prismicT.CustomTypeModelTitleField = prismicT.CustomTypeModelTitleField,
> = {
	pattern?: MockRichTextHeadingValueConfig["pattern"];
} & MockValueConfig<Model>;

export const title = (
	config: MockTitleValueConfig = {},
): prismicT.TitleField => {
	return [
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		heading({
			seed: config.seed,
			model: config.model,
			pattern: config.pattern,
		})!,
	] as prismicT.TitleField;
};
