import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

type MockLinkModel<
	AllowTargetBlank extends boolean = boolean,
	WithText extends boolean = boolean,
> = prismic.CustomTypeModelLinkField & {
	config: AllowTargetBlank extends true
		? { allowTargetBlank: true }
		: { allowTargetBlank?: undefined };
} & {
	config: WithText extends true
		? { text: prismic.CustomTypeModelKeyTextField }
		: { text?: undefined };
};

export type MockLinkModelConfig<
	AllowTargetBlank extends boolean = boolean,
	WithText extends boolean = boolean,
> = {
	allowTargetBlank?: AllowTargetBlank;
	withText?: WithText;
} & MockModelConfig;

export const link = <
	AllowTargetBlank extends boolean = boolean,
	WithText extends boolean = boolean,
>(
	config: MockLinkModelConfig<AllowTargetBlank, WithText>,
): MockLinkModel<AllowTargetBlank, WithText> => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.Link,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
			select: null,
			allowTargetBlank:
				("allowTargetBlank" in config
					? config.allowTargetBlank
					: faker.boolean()) || undefined,
			text: config.withText
				? { type: prismic.CustomTypeModelFieldType.Text }
				: undefined,
		},
	} as MockLinkModel<AllowTargetBlank, WithText>;
};
