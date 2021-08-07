import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

import * as modelGen from "../model";

import { contentRelationship } from "./contentRelationship";
import { linkToMedia } from "./linkToMedia";

type MockLinkValueConfig<
	LinkType extends prismicT.LinkType = prismicT.LinkType,
	IsFilled extends boolean = true,
	Model extends prismicT.CustomTypeModelLinkField = prismicT.CustomTypeModelLinkField,
> = {
	type?: LinkType;
	isFilled?: IsFilled;
} & MockValueConfig<Model>;

type MockLinkValue<
	LinkType extends prismicT.LinkType = prismicT.LinkType,
	IsFilled extends boolean = true,
> = IsFilled extends true
	? LinkType extends prismicT.LinkType.Web
		? prismicT.FilledLinkToWebField
		: LinkType extends prismicT.LinkType.Media
		? prismicT.FilledLinkToMediaField
		: LinkType extends prismicT.LinkType.Document
		? prismicT.FilledLinkToDocumentField
		: never
	: prismicT.EmptyLinkField<LinkType>;

export const link = <
	LinkType extends prismicT.LinkType = prismicT.LinkType,
	IsFilled extends boolean = true,
	Model extends prismicT.CustomTypeModelLinkField = prismicT.CustomTypeModelLinkField,
>(
	config: MockLinkValueConfig<LinkType, IsFilled, Model> = {},
): MockLinkValue<LinkType, IsFilled> => {
	const faker = createFaker(config.seed);

	const isFilled = config.isFilled ?? true;

	const type =
		config.type ||
		faker.random.arrayElement([
			prismicT.LinkType.Web,
			prismicT.LinkType.Document,
			prismicT.LinkType.Media,
		]);

	if (isFilled) {
		switch (type) {
			case prismicT.LinkType.Document: {
				return contentRelationship({
					seed: config.seed,
					isFilled,
				}) as MockLinkValue<LinkType, IsFilled>;
			}

			case prismicT.LinkType.Media: {
				return linkToMedia({
					seed: config.seed,
					isFilled,
				}) as MockLinkValue<LinkType, IsFilled>;
			}

			case prismicT.LinkType.Web: {
				const model = config.model || modelGen.link({ seed: config.seed });

				return {
					link_type: prismicT.LinkType.Web,
					url: "#",
					target:
						model.config.allowTargetBlank && faker.datatype.boolean()
							? "_blank"
							: undefined,
				} as MockLinkValue<LinkType, IsFilled>;
			}
		}
	}

	return {
		link_type: type,
	} as MockLinkValue<LinkType, IsFilled>;
};
