import * as prismicT from "@prismicio/types";

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
	config: MockLinkToMediaValueConfig<Model, State> = {},
): MockLinkToMediaValue<State> => {
	const faker = createFaker(config.seed);

	if (config.state === "empty") {
		return {
			link_type: prismicT.LinkType.Media,
		} as MockLinkToMediaValue<State>;
	} else {
		return {
			link_type: prismicT.LinkType.Media,
			name: faker.system.commonFileName(),
			kind: faker.system.commonFileType(),
			url: faker.internet.url(),
			size: faker.datatype.number().toString(),
			height: faker.datatype.number().toString(),
			width: faker.datatype.number().toString(),
		} as MockLinkToMediaValue<State>;
	}
};
