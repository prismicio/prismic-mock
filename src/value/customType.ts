import * as prismic from "@prismicio/client";

import { snakeCase } from "../lib/changeCase";
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
	Model extends prismic.CustomTypeModel = prismic.CustomTypeModel,
> = {
	withURL?: boolean;
	alternateLanguages?: prismic.PrismicDocument[];
	configs?: ValueForModelMapConfigs;
} & MockValueConfig<Model>;

export const customType = <
	Model extends prismic.CustomTypeModel = prismic.CustomTypeModel,
>(
	config: MockCustomTypeValueConfig<Model>,
): ModelValue<Model> => {
	const faker = config.faker || createFaker(config.seed);

	const model = config.model || modelGen.customType({ faker });

	const fieldModelsMap = Object.assign(
		{},
		...Object.values(model.json),
	) as prismic.CustomTypeModelTab;

	const dataFieldModelsMap: prismic.CustomTypeModelTab = {};
	for (const key in fieldModelsMap) {
		const fieldModel = fieldModelsMap[key];

		// UID fields must be filtered out since they are not represented in
		// the document's `data` field.
		if (fieldModel.type !== prismic.CustomTypeModelFieldType.UID) {
			dataFieldModelsMap[key] = fieldModel;
		}
	}

	const hasUID = Object.values(fieldModelsMap).some(
		(fieldModel) => fieldModel.type === prismic.CustomTypeModelFieldType.UID,
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
		uid: hasUID ? snakeCase(faker.words(faker.range(1, 3))) : null,
		url: withURL ? faker.url() : null,
		href: faker.url(),
		lang: faker.word(),
		tags: generateTags({ faker }),
		slugs: [] as prismic.PrismicDocument["slugs"],
		linked_documents: [] as prismic.PrismicDocument["linked_documents"],
		alternate_languages: alternateLanguages,
		first_publication_date: timestamp({ faker }),
		last_publication_date: timestamp({ faker }),
		data: valueForModelMap({
			faker,
			map: dataFieldModelsMap,
			configs: config.configs,
		}),
	} as ModelValue<Model>;
};
