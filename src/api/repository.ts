import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";
import { generateTags } from "../lib/generateTags";

import { MockRestApiConfig } from "../types";
import { ref } from "./ref";

export type MockRestApiRepositoryConfig = {
	customTypeModels?: prismicT.CustomTypeModel[];
	withReleases?: boolean;
} & MockRestApiConfig;

export const repository = (
	config: MockRestApiRepositoryConfig = {},
): prismicT.Repository => {
	const faker = createFaker(config.seed);

	const types = (config.customTypeModels || []).reduce((acc, model) => {
		acc[model.id] = model.label;

		return acc;
	}, {} as prismicT.Repository["types"]);

	return {
		refs: [
			ref({ seed: config.seed, isMasterRef: true }),
			...(config.withReleases
				? [ref({ seed: config.seed }), ref({ seed: config.seed })]
				: []),
		],
		integrationFieldsRef: ref({ seed: config.seed }).ref,
		types,
		languages: [
			{
				id: faker.lorem.word(),
				name: changeCase.capitalCase(faker.lorem.word()),
			},
		],
		tags: generateTags({
			seed: config.seed,
			min: 1,
			max: 10,
		}),
		forms: {},
		license: "All Rights Reserved",
		version: faker.git.shortSha(),
		bookmarks: {},
		experiments: {},
		oauth_token: faker.internet.url(),
		oauth_initiate: faker.internet.url(),
	};
};
