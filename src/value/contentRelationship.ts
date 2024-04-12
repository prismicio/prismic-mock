import * as prismic from "@prismicio/client";

import { buildContentRelationshipField } from "../lib/buildContentRelationshipField";
import { createFaker } from "../lib/createFaker";
import { generateCustomTypeId } from "../lib/generateCustomTypeId";
import { generateTags } from "../lib/generateTags";

import {
	MockValueStateConfig,
	MockValueConfig,
	IterableElement,
} from "../types";

import * as modelGen from "../model";

import { document as documentGen } from "./document";

export type MockContentRelationshipValueConfig<
	Model extends
		prismic.CustomTypeModelContentRelationshipField = prismic.CustomTypeModelContentRelationshipField,
	State extends prismic.FieldState = prismic.FieldState,
> = {
	/**
	 * A list of potential documents to which the field can be linked.
	 */
	linkableDocuments?: prismic.PrismicDocument[];
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

type MockContentRelationshipValue<
	Model extends
		prismic.CustomTypeModelContentRelationshipField = prismic.CustomTypeModelContentRelationshipField,
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.ContentRelationshipField<
	IterableElement<NonNullable<Model["config"]>["customtypes"]>,
	string,
	never,
	State
>;

export const contentRelationship = <
	Model extends
		prismic.CustomTypeModelContentRelationshipField = prismic.CustomTypeModelContentRelationshipField,
	State extends prismic.FieldState = "filled",
>(
	config: MockContentRelationshipValueConfig<Model, State>,
): MockContentRelationshipValue<Model, State> => {
	const faker = config.faker || createFaker(config.seed);

	if (config.state === "empty") {
		return {
			link_type: prismic.LinkType.Document,
		} as MockContentRelationshipValue<Model, State>;
	} else {
		const model = config.model || modelGen.contentRelationship({ faker });

		const linkableDocuments = config.linkableDocuments
			? config.linkableDocuments.filter(
					(
						document,
					): document is prismic.PrismicDocument<
						never,
						NonNullable<NonNullable<Model["config"]>["customtypes"]>[number]
					> => {
						let shouldKeep = true;

						if (model.config?.customtypes) {
							shouldKeep =
								shouldKeep && model.config.customtypes.includes(document.type);
						}

						if (model.config?.tags) {
							shouldKeep =
								shouldKeep &&
								model.config.tags.some((tag) => document.tags.includes(tag));
						}

						return shouldKeep;
					},
				)
			: [
					{
						...documentGen({ faker }),
						type: model.config?.customtypes
							? faker.randomElement(model.config.customtypes)
							: generateCustomTypeId({ faker }),
						tags: model.config?.tags
							? faker.randomElements(model.config.tags)
							: generateTags({ faker }),
					} as prismic.PrismicDocument<
						never,
						NonNullable<NonNullable<Model["config"]>["customtypes"]>[number]
					>,
				];

		const document = faker.randomElement(linkableDocuments);

		if (!document) {
			throw new Error("A linkable document could not be found.");
		}

		return buildContentRelationshipField({
			document,
		}) as unknown as MockContentRelationshipValue<Model, State>;
	}
};
