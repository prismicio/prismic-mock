import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { IsEmptyMockValueConfig, MockValueConfig } from "../types";

export type MockLinkToMediaValueConfig<
	Model extends prismicT.CustomTypeModelLinkToMediaField = prismicT.CustomTypeModelLinkToMediaField,
	IsEmpty extends boolean = boolean,
> = MockValueConfig<Model> & IsEmptyMockValueConfig<IsEmpty>;

type MockLinkToMediaValue<IsEmpty extends boolean = boolean> =
	prismicT.LinkToMediaField<IsEmpty>;

export const linkToMedia = <
	Model extends prismicT.CustomTypeModelLinkToMediaField = prismicT.CustomTypeModelLinkToMediaField,
	IsEmpty extends boolean = false,
>(
	config: MockLinkToMediaValueConfig<Model, IsEmpty> = {},
): MockLinkToMediaValue<IsEmpty> => {
	const faker = createFaker(config.seed);

	if (config.isEmpty) {
		return {
			link_type: prismicT.LinkType.Media,
		} as MockLinkToMediaValue<IsEmpty>;
	} else {
		return {
			link_type: prismicT.LinkType.Media,
			name: faker.system.commonFileName(),
			kind: faker.system.commonFileType(),
			url: faker.internet.url(),
			size: faker.datatype.number().toString(),
			height: faker.datatype.number().toString(),
			width: faker.datatype.number().toString(),
		} as MockLinkToMediaValue<IsEmpty>;
	}
};
