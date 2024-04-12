import * as prismic from "@prismicio/client";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockIntegrationFieldValueConfig<
	Model extends
		prismic.CustomTypeModelIntegrationField = prismic.CustomTypeModelIntegrationField,
	Data extends Record<string, unknown> = Record<string, unknown>,
	State extends prismic.FieldState = prismic.FieldState,
> = {
	data?: Data;
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockIntegrationFieldValue<
	Data extends Record<string, unknown> = Record<string, unknown>,
	State extends prismic.FieldState = prismic.FieldState,
> = prismic.IntegrationField<Data, State>;

export const integration = <
	Model extends
		prismic.CustomTypeModelIntegrationField = prismic.CustomTypeModelIntegrationField,
	Data extends Record<string, unknown> = Record<string, unknown>,
	State extends prismic.FieldState = "filled",
>(
	config: MockIntegrationFieldValueConfig<Model, Data, State>,
): MockIntegrationFieldValue<Data, State> => {
	const data = config.data ?? {};

	return (config.state === "empty" ? null : data) as MockIntegrationFieldValue<
		Data,
		State
	>;
};
