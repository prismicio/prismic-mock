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
	State extends prismicT.FieldState = prismicT.FieldState,
> = State extends true
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
	const faker = createFaker(config.seed);

	const type =
		config.type ||
		faker.random.arrayElement([
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
					seed: config.seed,
					state: config.state,
					linkableDocuments: config.linkableDocuments,
				}) as unknown as MockLinkValue<LinkType, State>;
			}

			case prismicT.LinkType.Media: {
				return linkToMedia({
					seed: config.seed,
					state: config.state,
				}) as MockLinkValue<LinkType, State>;
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
				} as MockLinkValue<LinkType, State>;
			}
		}
	}
};
