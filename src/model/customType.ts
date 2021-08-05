import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

import { buildRandomGroupFieldMap } from "../buildRandomGroupFieldMap";

import { uid } from "./uid";

type CustomTypeArgs = {
	tabsCount?: number;
	withUID?: boolean;
	withSliceZones?: boolean;
	withSharedSlices?: boolean;
};

export const customType = (
	args: CustomTypeArgs = {},
): prismicT.CustomTypeModel => {
	const tabsCount = args.tabsCount ?? faker.datatype.number({ min: 1, max: 3 });

	const json = {} as prismicT.CustomTypeModelDefinition;
	for (let i = 0; i < tabsCount; i++) {
		const tabName = changeCase.capitalCase(
			faker.lorem.words(faker.datatype.number({ min: 1, max: 3 })),
		);

		const tabFields = buildRandomGroupFieldMap() as prismicT.CustomTypeModelTab;

		if (i === 0 && args.withUID) {
			const fieldId = changeCase.snakeCase(
				faker.lorem.words(faker.datatype.number({ min: 1, max: 3 })),
			);

			tabFields[fieldId] = uid();
		}

		json[tabName] = tabFields;
	}

	const label = changeCase.capitalCase(faker.company.bsNoun());

	return {
		id: changeCase.snakeCase(label),
		label,
		status: faker.datatype.boolean(),
		repeatable: faker.datatype.boolean(),
		json,
	};
};
