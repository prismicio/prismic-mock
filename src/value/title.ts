import * as prismic from "@prismicio/client";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig, MockValueStateConfig } from "../types";

import { heading, MockRichTextHeadingValueConfig } from "./richText/heading";

export type MockTitleValueConfig<
	Model extends
		prismic.CustomTypeModelTitleField = prismic.CustomTypeModelTitleField,
	State extends prismic.FieldState = prismic.FieldState,
> = {
	pattern?: MockRichTextHeadingValueConfig["pattern"];
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockTitleValue<
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.TitleField<State>;

export const title = <
	Model extends
		prismic.CustomTypeModelTitleField = prismic.CustomTypeModelTitleField,
	State extends prismic.FieldState = "filled",
>(
	config: MockTitleValueConfig<Model, State>,
): MockTitleValue<State> => {
	const faker = config.faker || createFaker(config.seed);

	if (config.state === "empty") {
		return [] as MockTitleValue<State>;
	} else {
		return [
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			heading({
				faker,
				model: config.model,
				pattern: config.pattern,
			})!,
		] as MockTitleValue<State>;
	}
};
