import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";
import { generateTags } from "../lib/generateTags";
import { valueForModelMap } from "../lib/valueForModelMap";

import { MockValueConfig, ModelValue } from "../types";

import * as modelGen from "../model";

import { timestamp } from "./timestamp";

export type MockCustomTypeValueConfig<
	Model extends prismicT.CustomTypeModel = prismicT.CustomTypeModel,
> = {
	sharedSliceModels?: prismicT.SharedSliceModel[];
} & MockValueConfig<Model>;

export const customType = <
	Model extends prismicT.CustomTypeModel = prismicT.CustomTypeModel,
>(
	config: MockCustomTypeValueConfig = {},
): ModelValue<Model> => {
	const faker = createFaker(config.seed);

	const model = config.model || modelGen.customType({ seed: config.seed });

	const fieldModelsMap = Object.assign(
		{},
		...Object.values(model.json),
	) as prismicT.CustomTypeModelTab;
	const hasUID = Object.values(fieldModelsMap).some(
		(fieldModel) => fieldModel.type === prismicT.CustomTypeModelFieldType.UID,
	);

	return {
		type: model.id,
		id: faker.git.shortSha(),
		uid: hasUID ? changeCase.snakeCase(faker.lorem.words(2)) : undefined,
		url: faker.internet.url(),
		href: faker.internet.url(),
		lang: faker.lorem.word(),
		tags: generateTags({ seed: config.seed }),
		slugs: [],
		linked_documents: [],
		alternate_languages: [],
		first_publication_date: timestamp({ seed: config.seed }),
		last_publication_date: timestamp({ seed: config.seed }),
		data: valueForModelMap({
			seed: config.seed,
			map: fieldModelsMap,
		}),
	} as ModelValue<Model>;
};
