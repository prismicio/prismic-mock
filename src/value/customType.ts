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
import { buildAlternativeLanguage } from "../lib/buildAlternativeLanguage";

export type MockCustomTypeValueConfig<
	Model extends prismicT.CustomTypeModel = prismicT.CustomTypeModel,
> = {
	withURL?: boolean;
	alternateLanguages?: prismicT.PrismicDocument[];
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

	const dataFieldModelsMap: prismicT.CustomTypeModelTab = {};
	for (const key in fieldModelsMap) {
		const fieldModel = fieldModelsMap[key];

		// UID fields must be filtered out since they are not represented in
		// the document's `data` field.
		if (fieldModel.type !== prismicT.CustomTypeModelFieldType.UID) {
			dataFieldModelsMap[key] = fieldModel;
		}
	}

	const hasUID = Object.values(fieldModelsMap).some(
		(fieldModel) => fieldModel.type === prismicT.CustomTypeModelFieldType.UID,
	);

	const withURL = config.withURL ?? true;

	const alternateLanguages = (config.alternateLanguages || []).map(
		(alternateLanguageDocument) =>
			buildAlternativeLanguage({
				document: alternateLanguageDocument,
			}),
	);

	return {
		type: model.id,
		id: faker.hash(7),
		uid: hasUID ? changeCase.snakeCase(faker.words(faker.range(1, 3))) : null,
		url: withURL ? faker.url() : null,
		href: faker.url(),
		lang: faker.word(),
		tags: generateTags({ seed: config.seed }),
		slugs: [] as prismicT.PrismicDocument["slugs"],
		linked_documents: [] as prismicT.PrismicDocument["linked_documents"],
		alternate_languages: alternateLanguages,
		first_publication_date: timestamp({ seed: config.seed }),
		last_publication_date: timestamp({ seed: config.seed }),
		data: valueForModelMap({
			seed: config.seed,
			map: dataFieldModelsMap,
			configs: config.configs,
		}),
	} as ModelValue<Model>;
};
