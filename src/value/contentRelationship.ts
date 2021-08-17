import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockValueConfig } from "../types";

import * as modelGen from "../model";
import { document as documentGen } from "./document";
import { buildContentRelationshipField } from "../lib/buildContentRelationshipField";
import { generateCustomTypeId } from "../lib/generateCustomTypeId";
import { generateTags } from "../lib/generateTags";

export type MockContentRelationshipValueConfig<
	IsFilled extends boolean = boolean,
	Model extends prismicT.CustomTypeModelContentRelationshipField = prismicT.CustomTypeModelContentRelationshipField,
> = {
	isFilled?: IsFilled;
	/**
	 * A list of potential documents to which the field can be linked.
	 */
	linkableDocuments?: prismicT.PrismicDocument[];
} & MockValueConfig<Model>;

type MockContentRelationshipValue<IsFilled extends boolean = boolean> =
	IsFilled extends true
		? prismicT.FilledLinkToDocumentField
		: prismicT.EmptyLinkField<prismicT.LinkType.Document>;

export const contentRelationship = <
	IsFilled extends boolean = true,
	Model extends prismicT.CustomTypeModelContentRelationshipField = prismicT.CustomTypeModelContentRelationshipField,
>(
	config: MockContentRelationshipValueConfig<IsFilled, Model> = {},
): MockContentRelationshipValue<IsFilled> => {
	const faker = createFaker(config.seed);

	const isFilled = config.isFilled ?? true;

	if (isFilled) {
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
	} else {
		return {
			link_type: prismicT.LinkType.Document,
		} as MockContentRelationshipValue<IsFilled>;
	}
};
