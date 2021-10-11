import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";
import { getMockImageData } from "../lib/getMockImageData";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockIntegrationFieldsValueConfig<
	Model extends prismicT.CustomTypeModelIntegrationFieldsField = prismicT.CustomTypeModelIntegrationFieldsField,
	Blob extends unknown = unknown,
	State extends prismicT.FieldState = prismicT.FieldState,
> = {
	data?: Blob;
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockIntegrationFieldsValue<
	Blob extends unknown = unknown,
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.IntegrationFields<Blob, State>;

export const integrationFields = <
	Model extends prismicT.CustomTypeModelIntegrationFieldsField = prismicT.CustomTypeModelIntegrationFieldsField,
	Blob extends unknown = unknown,
	State extends prismicT.FieldState = "filled",
>(
	config: MockIntegrationFieldsValueConfig<Model, Blob, State> = {},
): MockIntegrationFieldsValue<Blob, State> => {
	const faker = createFaker(config.seed);

	const imageData = getMockImageData({ seed: config.seed });

	return (
		config.state
			? null
			: {
					id: faker.git.shortSha(),
					title: changeCase.capitalCase(faker.lorem.words(3)),
					description: faker.lorem.sentence(),
					image_url: imageData.url,
					last_update: faker.date.past(20, new Date("2021-03-07")).getTime(),
					blob: config.data as Blob,
			  }
	) as MockIntegrationFieldsValue<Blob, State>;
};
