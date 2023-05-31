import * as prismic from "@prismicio/client";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockIntegrationFieldsValueConfig<
	Model extends prismic.CustomTypeModelIntegrationFieldsField = prismic.CustomTypeModelIntegrationFieldsField,
	Data extends Record<string, unknown> = Record<string, unknown>,
	State extends prismic.FieldState = prismic.FieldState,
> = {
	data?: Data;
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockIntegrationFieldsValue<
	Data extends Record<string, unknown> = Record<string, unknown>,
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.IntegrationFields<Data, State>;

export const integrationFields = <
	Model extends prismic.CustomTypeModelIntegrationFieldsField = prismic.CustomTypeModelIntegrationFieldsField,
	Data extends Record<string, unknown> = Record<string, unknown>,
	State extends prismic.FieldState = "filled",
>(
	config: MockIntegrationFieldsValueConfig<Model, Data, State>,
): MockIntegrationFieldsValue<Data, State> => {
	const data = config.data ?? {};

	return (config.state === "empty" ? null : data) as MockIntegrationFieldsValue<
		Data,
		State
	>;
};
