import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

export type MockLinkToMediaValueConfig<
	IsFilled extends boolean = true,
	Model extends prismicT.CustomTypeModelLinkToMediaField = prismicT.CustomTypeModelLinkToMediaField,
> = {
	isFilled?: IsFilled;
} & MockValueConfig<Model>;

type MockLinkToMediaValue<IsFilled extends boolean = true> =
	IsFilled extends true
		? prismicT.FilledLinkToMediaField
		: prismicT.EmptyLinkField<prismicT.LinkType.Media>;

export const linkToMedia = <
	IsFilled extends boolean = true,
	Model extends prismicT.CustomTypeModelLinkToMediaField = prismicT.CustomTypeModelLinkToMediaField,
>(
	config: MockLinkToMediaValueConfig<IsFilled, Model> = {},
): MockLinkToMediaValue<IsFilled> => {
	const faker = createFaker(config.seed);

	const isFilled = config.isFilled ?? true;

	if (isFilled) {
		return {
			link_type: prismicT.LinkType.Media,
			name: faker.system.commonFileName(),
			kind: faker.system.commonFileType(),
			url: faker.internet.url(),
			size: faker.datatype.number().toString(),
			height: faker.datatype.number().toString(),
			width: faker.datatype.number().toString(),
		} as prismicT.FilledLinkToMediaField;
	} else {
		return {
			link_type: prismicT.LinkType.Media,
		} as MockLinkToMediaValue<IsFilled>;
	}
};
