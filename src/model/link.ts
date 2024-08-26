import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type LinkText = prismic.CustomTypeModelKeyTextField;

type MockLinkModel<
	AllowTargetBlank extends boolean = boolean,
	Text extends boolean = boolean,
> = prismic.CustomTypeModelLinkField & {
	config: AllowTargetBlank extends true
		? {
				allowTargetBlank: true;
			}
		: {
				allowTargetBlank?: undefined;
			};
} & {
	config: Text extends true
		? {
				text: LinkText;
			}
		: {
				text?: undefined;
			};
};

export type MockLinkModelConfig<
	AllowTargetBlank extends boolean = boolean,
	Text extends boolean = boolean,
> = {
	allowTargetBlank?: AllowTargetBlank;
	text?: Text;
} & MockModelConfig;

export const link = <
	AllowTargetBlank extends boolean = boolean,
	Text extends boolean = boolean,
>(
	config: MockLinkModelConfig<AllowTargetBlank, Text>,
): MockLinkModel<AllowTargetBlank, Text> => {
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
			text: config.text
				? {
						type: prismic.CustomTypeModelFieldType.Text,
					}
				: undefined,
		},
	} as MockLinkModel<AllowTargetBlank, Text>;
};
