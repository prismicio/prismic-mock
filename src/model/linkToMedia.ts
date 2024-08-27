import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

type MockLinkToMediaModel<WithText extends boolean = boolean> =
	prismic.CustomTypeModelLinkToMediaField & {
		config: WithText extends true
			? { text: prismic.CustomTypeModelKeyTextField }
			: { text?: undefined };
	};

export type MockLinkToMediaModelConfig<WithText extends boolean = boolean> = {
	withText?: WithText;
} & MockModelConfig;

export const linkToMedia = <WithText extends boolean = boolean>(
	config: MockLinkToMediaModelConfig<WithText>,
): MockLinkToMediaModel<WithText> => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.Link,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
			select: prismic.CustomTypeModelLinkSelectType.Media,
			text: config.withText
				? {
						type: prismic.CustomTypeModelFieldType.Text,
					}
				: undefined,
		},
	} as MockLinkToMediaModel<WithText>;
};
