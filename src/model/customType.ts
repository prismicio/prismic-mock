import * as prismicT from "@prismicio/types";
import * as faker from "faker/locale/en_US";
import * as changeCase from "change-case";

import { generateFieldId } from "../lib/generateFieldId";
import { buildRandomGroupFieldMap } from "../buildRandomGroupFieldMap";

import { uid } from "./uid";
import { sliceZone } from "./sliceZone";

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
			const fieldId = generateFieldId();

			tabFields[fieldId] = uid();
		}

		if (args.withSliceZones) {
			const sliceZoneId = generateFieldId();

			tabFields[sliceZoneId] = sliceZone({
				withSharedSlices: args.withSharedSlices,
			});
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
