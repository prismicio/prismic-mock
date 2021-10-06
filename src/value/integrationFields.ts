import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";
import { getMockImageData } from "../lib/getMockImageData";

import { IsEmptyMockValueConfig, MockValueConfig } from "../types";

export type MockIntegrationFieldsValueConfig<
	Model extends prismicT.CustomTypeModelIntegrationFieldsField = prismicT.CustomTypeModelIntegrationFieldsField,
	Blob extends unknown = unknown,
	IsEmpty extends boolean = boolean,
> = {
	data?: Blob;
} & MockValueConfig<Model> &
	IsEmptyMockValueConfig<IsEmpty>;

export type MockIntegrationFieldsValue<
	Blob extends unknown = unknown,
	IsEmpty extends boolean = boolean,
> = prismicT.IntegrationFields<Blob, IsEmpty>;

export const integrationFields = <
	Model extends prismicT.CustomTypeModelIntegrationFieldsField = prismicT.CustomTypeModelIntegrationFieldsField,
	Blob extends unknown = unknown,
	IsEmpty extends boolean = false,
>(
	config: MockIntegrationFieldsValueConfig<Model, Blob, IsEmpty> = {},
): MockIntegrationFieldsValue<Blob, IsEmpty> => {
	const faker = createFaker(config.seed);

	const imageData = getMockImageData({ seed: config.seed });

	return (
		config.isEmpty
			? null
			: {
					id: faker.git.shortSha(),
					title: changeCase.capitalCase(faker.lorem.words(3)),
					description: faker.lorem.sentence(),
					image_url: imageData.url,
					last_update: faker.date.past(20, new Date("2021-03-07")).getTime(),
					blob: config.data as Blob,
			  }
	) as MockIntegrationFieldsValue<Blob, IsEmpty>;
};
