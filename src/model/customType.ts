import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

type MockCustomTypeModelConfig<
	Definition extends
		| prismicT.CustomTypeModelTab
		| prismicT.CustomTypeModelDefinition =
		| prismicT.CustomTypeModelTab
		| prismicT.CustomTypeModelDefinition,
> = {
	id?: string;
	label?: string;
	status?: boolean;
	repeatable?: boolean;
} & (
	| {
			fields?: Definition;
			tabs?: never;
	  }
	| {
			tabs?: Definition;
			fields?: never;
	  }
) &
	MockModelConfig;

type MockCustomTypeModel<
	Definition extends
		| prismicT.CustomTypeModelTab
		| prismicT.CustomTypeModelDefinition,
> = Definition extends prismicT.CustomTypeModelTab
	? prismicT.CustomTypeModel<string, Record<"Main", Definition>>
	: Definition extends prismicT.CustomTypeModelDefinition
	? prismicT.CustomTypeModel<string, Definition>
	: never;

export const customType = <
	Definition extends
		| prismicT.CustomTypeModelTab
		| prismicT.CustomTypeModelDefinition,
>(
	config: MockCustomTypeModelConfig<Definition> = {},
): MockCustomTypeModel<Definition> => {
	const faker = config.faker || createFaker(config.seed);

	let label: string =
		config.label || changeCase.capitalCase(faker.words(faker.range(1, 2)));
	let id: string = config.id || changeCase.snakeCase(label);

	if (config.id && !config.label) {
		label = changeCase.capitalCase(config.id);
	} else if (config.label && !config.label) {
		id = changeCase.snakeCase(config.label);
	}

	let json = {} as MockCustomTypeModel<Definition>["json"];

	if ("fields" in config && config.fields) {
		json = { Main: config.fields } as typeof json;
	} else if ("tabs" in config && config.tabs) {
		json = config.tabs as typeof json;
	}

	return {
		id,
		label,
		status: config.status ?? faker.boolean(),
		repeatable: config.repeatable ?? faker.boolean(),
		json,
	} as MockCustomTypeModel<Definition>;
};
