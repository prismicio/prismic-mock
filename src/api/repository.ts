import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";
import { generateTags } from "../lib/generateTags";

import { MockRestApiConfig } from "../types";
import { ref } from "./ref";

export type MockRestApiRepositoryConfig = {
	customTypeModels?: prismic.CustomTypeModel[];
	withReleases?: boolean;
} & MockRestApiConfig;

export const repository = (
	config: MockRestApiRepositoryConfig,
): prismic.Repository => {
	const faker = config.faker || createFaker(config.seed);

	const types = (config.customTypeModels || []).reduce((acc, model) => {
		acc[model.id] = model.label || model.id;

		return acc;
	}, {} as prismic.Repository["types"]);

	return {
		refs: [
			ref({ faker, isMasterRef: true }),
			...(config.withReleases ? [ref({ faker }), ref({ faker })] : []),
		],
		integrationFieldsRef: ref({ faker }).ref,
		types,
		languages: [
			{
				id: faker.word(),
				name: changeCase.capitalCase(faker.word()),
			},
		],
		tags: generateTags({
			faker,
			min: 1,
			max: 10,
		}),
		forms: {},
		license: "All Rights Reserved",
		version: faker.hash(7),
		bookmarks: {},
		experiments: {},
		oauth_token: faker.url(),
		oauth_initiate: faker.url(),
	};
};
