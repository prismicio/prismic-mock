import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";
import { getMockImageData } from "../lib/getMockImageData";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockIntegrationFieldsValueConfig<
	Model extends prismicT.CustomTypeModelIntegrationFieldsField = prismicT.CustomTypeModelIntegrationFieldsField,
	Blob = unknown,
	State extends prismicT.FieldState = prismicT.FieldState,
> = {
	data?: Blob;
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockIntegrationFieldsValue<
	Blob = unknown,
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.IntegrationFields<Blob, State>;

export const integrationFields = <
	Model extends prismicT.CustomTypeModelIntegrationFieldsField = prismicT.CustomTypeModelIntegrationFieldsField,
	Blob = unknown,
	State extends prismicT.FieldState = "filled",
>(
	config: MockIntegrationFieldsValueConfig<Model, Blob, State> = {},
): MockIntegrationFieldsValue<Blob, State> => {
	const faker = createFaker(config.seed);

	const imageData = getMockImageData({ seed: config.seed });

	return (
		config.state === "empty"
			? null
			: {
					id: faker.hash(7),
					title: changeCase.capitalCase(faker.words(faker.range(1, 3))),
					description: changeCase.sentenceCase(faker.words(faker.range(5, 10))),
					image_url: imageData.url,
					last_update: faker.date().getTime(),
					blob: config.data as Blob,
			  }
	) as MockIntegrationFieldsValue<Blob, State>;
};
