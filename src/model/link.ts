import * as prismic from "@prismicio/client";

import { capitalCase, sentenceCase } from "../lib/changeCase";
import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

type MockLinkModel<
	AllowTargetBlank extends boolean = boolean,
	AllowText extends boolean = boolean,
	Repeat extends boolean = boolean,
> = prismic.CustomTypeModelLinkField & {
	config: AllowTargetBlank extends true
		? { allowTargetBlank: true }
		: { allowTargetBlank?: undefined };
} & {
	config: AllowText extends true
		? { allowText: true }
		: { allowText?: undefined };
} & {
	config: Repeat extends true ? { repeat: true } : { repeat?: undefined };
};

export type MockLinkModelConfig<
	AllowTargetBlank extends boolean = boolean,
	AllowText extends boolean = boolean,
	Repeat extends boolean = boolean,
> = {
	allowTargetBlank?: AllowTargetBlank;
	allowText?: AllowText;
	repeat?: Repeat;
} & MockModelConfig;

export const link = <
	AllowTargetBlank extends boolean = boolean,
	AllowText extends boolean = boolean,
	Repeat extends boolean = boolean,
>(
	config: MockLinkModelConfig<AllowTargetBlank, AllowText, Repeat>,
): MockLinkModel<AllowTargetBlank, AllowText, Repeat> => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.Link,
		config: {
			label: capitalCase(faker.word()),
			placeholder: sentenceCase(faker.words(3)),
			select: null,
			allowTargetBlank:
				("allowTargetBlank" in config
					? config.allowTargetBlank
					: faker.boolean()) || undefined,
			allowText:
				("allowText" in config ? config.allowText : faker.boolean()) ||
				undefined,
			repeat:
				("repeat" in config ? config.repeat : faker.boolean()) || undefined,
		},
	} as MockLinkModel<AllowTargetBlank, AllowText, Repeat>;
};
