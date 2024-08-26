import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { LinkText } from "./link";
import { MockModelConfig } from "../types";

type MockLinkToMediaModel<Text extends boolean = boolean> =
	prismic.CustomTypeModelLinkToMediaField & {
		config: Text extends true
			? {
					text: LinkText;
				}
			: {
					text?: undefined;
				};
	};

export type MockLinkToMediaModelConfig<Text extends boolean = boolean> = {
	text?: Text;
} & MockModelConfig;

export const linkToMedia = <Text extends boolean = boolean>(
	config: MockLinkToMediaModelConfig<Text>,
): MockLinkToMediaModel<Text> => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelFieldType.Link,
		config: {
			label: changeCase.capitalCase(faker.word()),
			placeholder: changeCase.sentenceCase(faker.words(3)),
			select: prismic.CustomTypeModelLinkSelectType.Media,
			text: config.text
				? {
						type: prismic.CustomTypeModelFieldType.Text,
					}
				: undefined,
		},
	} as MockLinkToMediaModel<Text>;
};
