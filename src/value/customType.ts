import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";
import { generateTags } from "../lib/generateTags";
import {
	valueForModelMap,
	ValueForModelMapConfigs,
} from "../lib/valueForModelMap";

import { MockValueConfig, ModelValue } from "../types";

import * as modelGen from "../model";

import { timestamp } from "./timestamp";

export type MockCustomTypeValueConfig<
	Model extends prismicT.CustomTypeModel = prismicT.CustomTypeModel,
> = {
	withURL?: boolean;
	sharedSliceModels?: prismicT.SharedSliceModel[];
	configs?: ValueForModelMapConfigs;
} & MockValueConfig<Model>;

export const customType = <
	Model extends prismicT.CustomTypeModel = prismicT.CustomTypeModel,
>(
	config: MockCustomTypeValueConfig<Model> = {},
): ModelValue<Model> => {
	const faker = createFaker(config.seed);

	const model = config.model || modelGen.customType({ seed: config.seed });

	const fieldModelsMap = Object.assign(
		{},
		...Object.values(model.json),
	) as prismicT.CustomTypeModelTab;

	const dataFieldMmodelsMap: prismicT.CustomTypeModelTab = {};
	for (const key in fieldModelsMap) {
		const fieldModel = fieldModelsMap[key];

		// UID fields must be filtered out since they are not represented in
		// the document's `data` field.
		if (fieldModel.type !== prismicT.CustomTypeModelFieldType.UID) {
			dataFieldMmodelsMap[key] = fieldModel;
		}
	}

	const hasUID = Object.values(fieldModelsMap).some(
		(fieldModel) => fieldModel.type === prismicT.CustomTypeModelFieldType.UID,
	);

	const withURL = config.withURL ?? true;

	return {
		type: model.id,
		id: faker.git.shortSha(),
		uid: hasUID ? changeCase.snakeCase(faker.lorem.words(2)) : null,
		url: withURL ? faker.internet.url() : null,
		href: faker.internet.url(),
		lang: faker.lorem.word(),
		tags: generateTags({ seed: config.seed }),
		slugs: [] as prismicT.PrismicDocument["slugs"],
		linked_documents: [] as prismicT.PrismicDocument["linked_documents"],
		alternate_languages: [] as prismicT.PrismicDocument["alternate_languages"],
		first_publication_date: timestamp({ seed: config.seed }),
		last_publication_date: timestamp({ seed: config.seed }),
		data: valueForModelMap({
			seed: config.seed,
			map: dataFieldMmodelsMap,
			configs: config.configs,
		}),
	} as ModelValue<Model>;
};
