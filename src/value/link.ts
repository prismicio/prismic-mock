import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockValueStateConfig, MockValueConfig } from "../types";

import * as modelGen from "../model";

import { contentRelationship } from "./contentRelationship";
import { linkToMedia } from "./linkToMedia";

export type MockLinkValueConfig<
	LinkType extends
		(typeof prismic.LinkType)[keyof typeof prismic.LinkType] = (typeof prismic.LinkType)[keyof typeof prismic.LinkType],
	Model extends
		prismic.CustomTypeModelLinkField = prismic.CustomTypeModelLinkField,
	State extends prismic.FieldState = prismic.FieldState,
> = {
	type?: LinkType;
	withTargetBlank?: NonNullable<
		Model["config"]
	>["allowTargetBlank"] extends undefined
		? false
		: boolean;
	withText?: NonNullable<Model["config"]>["allowText"] extends undefined
		? false
		: boolean;
	/**
	 * A list of potential documents to which the field can be linked.
	 */
	linkableDocuments?: LinkType extends typeof prismic.LinkType.Document
		? prismic.PrismicDocument[]
		: never;
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

type MockLinkValue<
	LinkType extends
		(typeof prismic.LinkType)[keyof typeof prismic.LinkType] = (typeof prismic.LinkType)[keyof typeof prismic.LinkType],
	State extends prismic.FieldState = "filled",
> = State extends "empty"
	? prismic.EmptyLinkField<LinkType>
	: LinkType extends typeof prismic.LinkType.Web
		? prismic.FilledLinkToWebField
		: LinkType extends typeof prismic.LinkType.Media
			? prismic.FilledLinkToMediaField
			: LinkType extends typeof prismic.LinkType.Document
				? prismic.FilledContentRelationshipField
				: never;

export const link = <
	LinkType extends
		(typeof prismic.LinkType)[keyof typeof prismic.LinkType] = (typeof prismic.LinkType)[keyof typeof prismic.LinkType],
	Model extends
		prismic.CustomTypeModelLinkField = prismic.CustomTypeModelLinkField,
	State extends prismic.FieldState = "filled",
>(
	config: MockLinkValueConfig<LinkType, Model, State>,
): MockLinkValue<LinkType, State> => {
	const faker = config.faker || createFaker(config.seed);

	const type =
		config.type ||
		faker.randomElement([
			prismic.LinkType.Web,
			prismic.LinkType.Document,
			prismic.LinkType.Media,
		]);

	if (config.state === "empty") {
		return {
			link_type: type,
		} as MockLinkValue<LinkType, State>;
	} else {
		switch (type) {
			case prismic.LinkType.Document: {
				return contentRelationship({
					faker,
					state: config.state,
					linkableDocuments: config.linkableDocuments,
				}) as unknown as MockLinkValue<LinkType, State>;
			}

			case prismic.LinkType.Media: {
				return linkToMedia({
					faker,
					state: config.state,
					withText: config.withText,
				}) as MockLinkValue<LinkType, State>;
			}

			case prismic.LinkType.Web:
			default: {
				const model = config.model || modelGen.link({ faker });

				return {
					link_type: prismic.LinkType.Web,
					url: faker.url(),
					target:
						config.withTargetBlank ??
						(model.config?.allowTargetBlank && faker.boolean())
							? "_blank"
							: undefined,
					text:
						config.withText ?? (model.config?.allowText && faker.boolean())
							? changeCase.sentenceCase(faker.words(2))
							: undefined,
				} as MockLinkValue<LinkType, State>;
			}
		}
	}
};
