import * as prismicT from "@prismicio/types";

import { MockValueConfig, MockValueStateConfig } from "../types";

import { heading, MockRichTextHeadingValueConfig } from "./richText/heading";

export type MockTitleValueConfig<
	Model extends prismicT.CustomTypeModelTitleField = prismicT.CustomTypeModelTitleField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = {
	pattern?: MockRichTextHeadingValueConfig["pattern"];
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockTitleValue<
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.TitleField<State>;

export const title = <
	Model extends prismicT.CustomTypeModelTitleField = prismicT.CustomTypeModelTitleField,
	State extends prismicT.FieldState = prismicT.FieldState,
>(
	config: MockTitleValueConfig<Model, State> = {},
): MockTitleValue<State> => {
	if (config.state === "empty") {
		return [] as MockTitleValue<State>;
	} else {
		return [
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			heading({
				seed: config.seed,
				model: config.model,
				pattern: config.pattern,
			})!,
		] as MockTitleValue<State>;
	}
};
