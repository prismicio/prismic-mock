import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { IsEmptyMockValueConfig, MockValueConfig } from "../types";

import * as modelGen from "../model";

import { contentRelationship } from "./contentRelationship";
import { linkToMedia } from "./linkToMedia";

export type MockLinkValueConfig<
	LinkType extends prismicT.LinkType = prismicT.LinkType,
	Model extends prismicT.CustomTypeModelLinkField = prismicT.CustomTypeModelLinkField,
	IsEmpty extends boolean = boolean,
> = {
	type?: LinkType;
	withTargetBlank?: Model["config"]["allowTargetBlank"] extends undefined
		? false
		: boolean;
	/**
	 * A list of potential documents to which the field can be linked.
	 */
	linkableDocuments?: LinkType extends prismicT.LinkType.Document
		? prismicT.PrismicDocument[]
		: never;
} & MockValueConfig<Model> &
	IsEmptyMockValueConfig<IsEmpty>;

type MockLinkValue<
	LinkType extends prismicT.LinkType = prismicT.LinkType,
	IsEmpty extends boolean = boolean,
> = IsEmpty extends true
	? prismicT.EmptyLinkField<LinkType>
	: LinkType extends prismicT.LinkType.Web
	? prismicT.FilledLinkToWebField
	: LinkType extends prismicT.LinkType.Media
	? prismicT.FilledLinkToMediaField
	: LinkType extends prismicT.LinkType.Document
	? prismicT.FilledLinkToDocumentField
	: never;

export const link = <
	LinkType extends prismicT.LinkType = prismicT.LinkType,
	Model extends prismicT.CustomTypeModelLinkField = prismicT.CustomTypeModelLinkField,
	IsEmpty extends boolean = false,
>(
	config: MockLinkValueConfig<LinkType, Model, IsEmpty> = {},
): MockLinkValue<LinkType, IsEmpty> => {
	const faker = createFaker(config.seed);

	const type =
		config.type ||
		faker.random.arrayElement([
			prismicT.LinkType.Web,
			prismicT.LinkType.Document,
			prismicT.LinkType.Media,
		]);

	if (config.isEmpty) {
		return {
			link_type: type,
		} as MockLinkValue<LinkType, IsEmpty>;
	} else {
		switch (type) {
			case prismicT.LinkType.Document: {
				return contentRelationship({
					seed: config.seed,
					isEmpty: config.isEmpty,
					linkableDocuments: config.linkableDocuments,
				}) as MockLinkValue<LinkType, IsEmpty>;
			}

			case prismicT.LinkType.Media: {
				return linkToMedia({
					seed: config.seed,
					isEmpty: config.isEmpty,
				}) as MockLinkValue<LinkType, IsEmpty>;
			}

			case prismicT.LinkType.Web:
			default: {
				const model = config.model || modelGen.link({ seed: config.seed });

				return {
					link_type: prismicT.LinkType.Web,
					url: faker.internet.url(),
					target:
						config.withTargetBlank ??
						(model.config.allowTargetBlank && faker.datatype.boolean())
							? "_blank"
							: undefined,
				} as MockLinkValue<LinkType, IsEmpty>;
			}
		}
	}
};
