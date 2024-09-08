import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

type MockLinkToMediaModel<AllowText extends boolean = boolean> =
	prismic.CustomTypeModelLinkToMediaField & {
		config: AllowText extends true
			? { allowText: true }
			: { allowText?: undefined };
	};

export type MockLinkToMediaModelConfig<AllowText extends boolean = boolean> = {
	allowText?: AllowText;
} & MockModelConfig;

export const linkToMedia = <AllowText extends boolean = boolean>(
	config: MockLinkToMediaModelConfig<AllowText>,
): MockLinkToMediaModel<AllowText> => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.Link,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
			select: prismic.CustomTypeModelLinkSelectType.Media,
			allowText:
				("allowText" in config ? config.allowText : faker.boolean()) ||
				undefined,
		},
	} as MockLinkToMediaModel<AllowText>;
};
