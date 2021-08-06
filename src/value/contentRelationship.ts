import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";
import { generateCustomTypeId } from "../lib/generateCustomTypeId";
import { generateFieldId } from "../lib/generateFieldId";

import { MockValueConfig } from "../types";

import * as modelGen from "../model";

type MockContentRelationshipValueConfig<
	IsFilled extends boolean = boolean,
	Model extends prismicT.CustomTypeModelContentRelationshipField = prismicT.CustomTypeModelContentRelationshipField,
> = {
	isFilled?: IsFilled;
} & MockValueConfig<Model>;

type MockContentRelationshipValueReturnType<
	IsFilled extends boolean = boolean,
> = IsFilled extends true
	? prismicT.FilledLinkToDocumentField
	: prismicT.EmptyLinkField<prismicT.LinkType.Document>;

export const contentRelationship = <IsFilled extends boolean = boolean>(
	config: MockContentRelationshipValueConfig<IsFilled> = {},
): MockContentRelationshipValueReturnType<IsFilled> => {
	const faker = createFaker(config.seed);

	const isFilled = config.isFilled ?? faker.datatype.boolean();

	if (isFilled) {
		const model =
			config.model ||
			modelGen.contentRelationship({
				seed: config.seed,
			});
		const type = model.config.customtypes
			? faker.random.arrayElement(model.config.customtypes)
			: generateCustomTypeId({ seed: config.seed });

		return {
			link_type: prismicT.LinkType.Document,
			id: faker.git.shortSha(),
			uid: faker.datatype.boolean()
				? changeCase.snakeCase(faker.lorem.words(2))
				: undefined,
			type,
			lang: faker.lorem.word(),
			url: "#",
			slug: generateFieldId({ seed: config.seed }),
			isBroken: faker.datatype.boolean(),
		} as prismicT.FilledLinkToDocumentField;
	} else {
		return {
			link_type: prismicT.LinkType.Document,
		} as MockContentRelationshipValueReturnType<IsFilled>;
	}
};
