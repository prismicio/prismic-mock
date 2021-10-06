import * as prismicT from "@prismicio/types";

import { buildContentRelationshipField } from "../lib/buildContentRelationshipField";
import { createFaker } from "../lib/createFaker";
import { generateCustomTypeId } from "../lib/generateCustomTypeId";
import { generateTags } from "../lib/generateTags";

import { IsEmptyMockValueConfig, MockValueConfig } from "../types";

import * as modelGen from "../model";

import { document as documentGen } from "./document";

export type MockContentRelationshipValueConfig<
	Model extends prismicT.CustomTypeModelContentRelationshipField = prismicT.CustomTypeModelContentRelationshipField,
	IsEmpty extends boolean = boolean,
> = {
	/**
	 * A list of potential documents to which the field can be linked.
	 */
	linkableDocuments?: prismicT.PrismicDocument[];
} & MockValueConfig<Model> &
	IsEmptyMockValueConfig<IsEmpty>;

type MockContentRelationshipValue<IsEmpty extends boolean = boolean> =
	prismicT.RelationField<string, string, never, IsEmpty>;

export const contentRelationship = <
	Model extends prismicT.CustomTypeModelContentRelationshipField = prismicT.CustomTypeModelContentRelationshipField,
	IsEmpty extends boolean = false,
>(
	config: MockContentRelationshipValueConfig<Model, IsEmpty> = {},
): MockContentRelationshipValue<IsEmpty> => {
	const faker = createFaker(config.seed);

	if (config.isEmpty) {
		return {
			link_type: prismicT.LinkType.Document,
		} as MockContentRelationshipValue<IsEmpty>;
	} else {
		const model =
			config.model || modelGen.contentRelationship({ seed: config.seed });

		const linkableDocuments = config.linkableDocuments
			? config.linkableDocuments.filter((document) => {
					let shouldKeep = true;

					if (model.config.customtypes) {
						shouldKeep =
							shouldKeep && model.config.customtypes.includes(document.type);
					}

					if (model.config.tags) {
						shouldKeep =
							shouldKeep &&
							model.config.tags.some((tag) => document.tags.includes(tag));
					}

					return shouldKeep;
			  })
			: [
					{
						...documentGen({ seed: config.seed }),
						type: model.config.customtypes
							? faker.random.arrayElement(model.config.customtypes)
							: generateCustomTypeId({ seed: config.seed }),
						tags: model.config.tags
							? faker.random.arrayElements(model.config.tags)
							: generateTags({ seed: config.seed }),
					},
			  ];

		const document = faker.random.arrayElement(linkableDocuments);

		if (!document) {
			throw new Error("A linkable document could not be found.");
		}

		return buildContentRelationshipField({ document });
	}
};
