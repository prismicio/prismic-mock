import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

export type MockCustomTypeModelConfig<
	Definition extends
		| prismic.CustomTypeModelTab
		| prismic.CustomTypeModelDefinition =
		| prismic.CustomTypeModelTab
		| prismic.CustomTypeModelDefinition,
> = {
	id?: string;
	label?: string;
	status?: boolean;
	repeatable?: boolean;
	format?: prismic.CustomTypeModel["format"];
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
		| prismic.CustomTypeModelTab
		| prismic.CustomTypeModelDefinition,
> = Definition extends prismic.CustomTypeModelTab
	? prismic.CustomTypeModel<string, Record<"Main", Definition>>
	: Definition extends prismic.CustomTypeModelDefinition
	? prismic.CustomTypeModel<string, Definition>
	: never;

export const customType = <
	Definition extends
		| prismic.CustomTypeModelTab
		| prismic.CustomTypeModelDefinition,
>(
	config: MockCustomTypeModelConfig<Definition>,
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

	const format = config.format ?? faker.randomElement(["page", "custom"]);

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
		format,
		json,
	} as MockCustomTypeModel<Definition>;
};
