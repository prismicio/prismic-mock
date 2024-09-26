import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

type MockLinkModel<
	AllowTargetBlank extends boolean = boolean,
	AllowText extends boolean = boolean,
> = prismic.CustomTypeModelLinkField & {
	config: AllowTargetBlank extends true
		? { allowTargetBlank: true }
		: { allowTargetBlank?: undefined };
} & {
	config: AllowText extends true
		? { allowText: true }
		: { allowText?: undefined };
};

export type MockLinkModelConfig<
	AllowTargetBlank extends boolean = boolean,
	AllowText extends boolean = boolean,
> = {
	allowTargetBlank?: AllowTargetBlank;
	allowText?: AllowText;
} & MockModelConfig;

export const link = <
	AllowTargetBlank extends boolean = boolean,
	AllowText extends boolean = boolean,
>(
	config: MockLinkModelConfig<AllowTargetBlank, AllowText>,
): MockLinkModel<AllowTargetBlank, AllowText> => {
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
			allowText:
				("allowText" in config ? config.allowText : faker.boolean()) ||
				undefined,
		},
	} as MockLinkModel<AllowTargetBlank, AllowText>;
};
