import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockLinkToMediaValueConfig<
	Model extends prismicT.CustomTypeModelLinkToMediaField = prismicT.CustomTypeModelLinkToMediaField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = MockValueConfig<Model> & MockValueStateConfig<State>;

type MockLinkToMediaValue<
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.LinkToMediaField<State>;

export const linkToMedia = <
	Model extends prismicT.CustomTypeModelLinkToMediaField = prismicT.CustomTypeModelLinkToMediaField,
	State extends prismicT.FieldState = "filled",
>(
	config: MockLinkToMediaValueConfig<Model, State>,
): MockLinkToMediaValue<State> => {
	const faker = config.faker || createFaker(config.seed);

	if (config.state === "empty") {
		return {
			link_type: prismicT.LinkType.Media,
		} as MockLinkToMediaValue<State>;
	} else {
		return {
			link_type: prismicT.LinkType.Media,
			name: `${changeCase.snakeCase(faker.words(faker.range(1, 2)))}.example`,
			kind: changeCase.snakeCase(faker.word()),
			url: faker.url(),
			size: faker.range(500, 3000).toString(),
			height: faker.range(500, 3000).toString(),
			width: faker.range(500, 3000).toString(),
		} as MockLinkToMediaValue<State>;
	}
};
