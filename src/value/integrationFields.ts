import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";
import { getMockImageData } from "../lib/getMockImageData";

import { MockValueConfig } from "../types";

export type MockIntegrationFieldsValueConfig<
	Model extends prismicT.CustomTypeModelIntegrationFieldsField = prismicT.CustomTypeModelIntegrationFieldsField,
	Blob extends unknown = unknown,
> = {
	data?: Blob;
} & MockValueConfig<Model>;

export const integrationFields = <
	Model extends prismicT.CustomTypeModelIntegrationFieldsField = prismicT.CustomTypeModelIntegrationFieldsField,
	Blob extends unknown = unknown,
>(
	config: MockIntegrationFieldsValueConfig<Model, Blob> = {},
): prismicT.IntegrationFields<Blob> => {
	const faker = createFaker(config.seed);

	const imageData = getMockImageData({ seed: config.seed });

	return {
		id: faker.git.shortSha(),
		title: changeCase.capitalCase(faker.lorem.words(3)),
		description: faker.lorem.sentence(),
		image_url: imageData.url,
		last_update: faker.date.past().getTime(),
		blob: config.data as Blob,
	};
};
