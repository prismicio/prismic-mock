import * as prismicT from "@prismicio/types";

import { MockValueStateConfig, MockValueConfig } from "../types";

export type MockIntegrationFieldsValueConfig<
	Model extends prismicT.CustomTypeModelIntegrationFieldsField = prismicT.CustomTypeModelIntegrationFieldsField,
	Data extends Record<string, unknown> = Record<string, unknown>,
	State extends prismicT.FieldState = prismicT.FieldState,
> = {
	data?: Data;
} & MockValueConfig<Model> &
	MockValueStateConfig<State>;

export type MockIntegrationFieldsValue<
	Data extends Record<string, unknown> = Record<string, unknown>,
	State extends prismicT.FieldState = prismicT.FieldState,
> = prismicT.IntegrationFields<Data, State>;

export const integrationFields = <
	Model extends prismicT.CustomTypeModelIntegrationFieldsField = prismicT.CustomTypeModelIntegrationFieldsField,
	Data extends Record<string, unknown> = Record<string, unknown>,
	State extends prismicT.FieldState = "filled",
>(
	config: MockIntegrationFieldsValueConfig<Model, Data, State> = {},
): MockIntegrationFieldsValue<Data, State> => {
	return (
		config.state === "empty" ? null : config.data
	) as MockIntegrationFieldsValue<Data, State>;
};
