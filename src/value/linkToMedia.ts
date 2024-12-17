import * as prismic from "@prismicio/client";

import { sentenceCase, snakeCase } from "../lib/changeCase";
import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

import * as modelGen from "../model";

export type MockLinkToMediaValueConfig<
	Model extends
		prismic.CustomTypeModelLinkToMediaField = prismic.CustomTypeModelLinkToMediaField,
	State extends prismic.FieldState = prismic.FieldState,
> = {
	withText?: NonNullable<Model["config"]>["allowText"] extends undefined
		? false
		: boolean;
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

type MockLinkToMediaValue<
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.LinkToMediaField<State>;

export const linkToMedia = <
	Model extends
		prismic.CustomTypeModelLinkToMediaField = prismic.CustomTypeModelLinkToMediaField,
	State extends prismic.FieldState = "filled",
>(
	config: MockLinkToMediaValueConfig<Model, State>,
): MockLinkToMediaValue<State> => {
	const faker = config.faker || createFaker(config.seed);

	if (config.state === "empty") {
		return {
			link_type: prismic.LinkType.Media,
		} as MockLinkToMediaValue<State>;
	} else {
		const model = config.model || modelGen.link({ faker });

		return {
			link_type: prismic.LinkType.Media,
			id: faker.hash(11),
			name: `${snakeCase(faker.words(faker.range(1, 2)))}.example`,
			kind: snakeCase(faker.word()),
			url: faker.url(),
			size: faker.range(500, 3000).toString(),
			height: faker.range(500, 3000).toString(),
			width: faker.range(500, 3000).toString(),
			text:
				config.withText ?? (model.config?.allowText && faker.boolean())
					? sentenceCase(faker.words(2))
					: undefined,
		} as MockLinkToMediaValue<State>;
	}
};
