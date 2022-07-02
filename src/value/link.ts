import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

import * as modelGen from "../model";

import { contentRelationship } from "./contentRelationship";
import { linkToMedia } from "./linkToMedia";

export type MockLinkValueConfig<
	LinkType extends typeof prismicT.LinkType[keyof typeof prismicT.LinkType] = typeof prismicT.LinkType[keyof typeof prismicT.LinkType],
	Model extends prismicT.CustomTypeModelLinkField = prismicT.CustomTypeModelLinkField,
	State extends prismicT.FieldState = prismicT.FieldState,
> = {
	type?: LinkType;
	withTargetBlank?: Model["config"]["allowTargetBlank"] extends undefined
		? false
		: boolean;
	/**
	 * A list of potential documents to which the field can be linked.
	 */
	linkableDocuments?: LinkType extends typeof prismicT.LinkType.Document
		? prismicT.PrismicDocument[]
		: never;
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

type MockLinkValue<
	LinkType extends typeof prismicT.LinkType[keyof typeof prismicT.LinkType] = typeof prismicT.LinkType[keyof typeof prismicT.LinkType],
	State extends prismicT.FieldState = "filled",
> = State extends "empty"
	? prismicT.EmptyLinkField<LinkType>
	: LinkType extends typeof prismicT.LinkType.Web
	? prismicT.FilledLinkToWebField
	: LinkType extends typeof prismicT.LinkType.Media
	? prismicT.FilledLinkToMediaField
	: LinkType extends typeof prismicT.LinkType.Document
	? prismicT.FilledLinkToDocumentField
	: never;

export const link = <
	LinkType extends typeof prismicT.LinkType[keyof typeof prismicT.LinkType] = typeof prismicT.LinkType[keyof typeof prismicT.LinkType],
	Model extends prismicT.CustomTypeModelLinkField = prismicT.CustomTypeModelLinkField,
	State extends prismicT.FieldState = "filled",
>(
	config: MockLinkValueConfig<LinkType, Model, State> = {},
): MockLinkValue<LinkType, State> => {
	const faker = config.faker || createFaker(config.seed);

	const type =
		config.type ||
		faker.randomElement([
			prismicT.LinkType.Web,
			prismicT.LinkType.Document,
			prismicT.LinkType.Media,
		]);

	if (config.state === "empty") {
		return {
			link_type: type,
		} as MockLinkValue<LinkType, State>;
	} else {
		switch (type) {
			case prismicT.LinkType.Document: {
				return contentRelationship({
					faker,
					state: config.state,
					linkableDocuments: config.linkableDocuments,
				}) as unknown as MockLinkValue<LinkType, State>;
			}

			case prismicT.LinkType.Media: {
				return linkToMedia({
					faker,
					state: config.state,
				}) as MockLinkValue<LinkType, State>;
			}

			case prismicT.LinkType.Web:
			default: {
				const model = config.model || modelGen.link({ faker });

				return {
					link_type: prismicT.LinkType.Web,
					url: faker.url(),
					target:
						config.withTargetBlank ??
						(model.config.allowTargetBlank && faker.boolean())
							? "_blank"
							: undefined,
				} as MockLinkValue<LinkType, State>;
			}
		}
	}
};
