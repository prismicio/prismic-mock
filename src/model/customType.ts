import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { buildMockGroupFieldMap } from "../lib/buildMockGroupFieldMap";
import { createFaker } from "../lib/createFaker";
import { generateCustomTypeId } from "../lib/generateCustomTypeId";
import { generateFieldId } from "../lib/generateFieldId";

import { MockModelConfig } from "../types";

import { uid } from "./uid";
import { sliceZone } from "./sliceZone";

type MockCustomTypeModelConfig = {
	tabsCount?: number;
	withUID?: boolean;
} & (
	| {
			withSliceZones?: false;
	  }
	| {
			withSliceZones: true;
			withSharedSlices?: boolean;
	  }
) &
	MockModelConfig;

export const customType = (
	config: MockCustomTypeModelConfig = {},
): prismicT.CustomTypeModel => {
	const faker = createFaker(config.seed);

	const tabsCount =
		config.tabsCount ?? faker.datatype.number({ min: 1, max: 3 });

	const json: prismicT.CustomTypeModelDefinition = {};
	for (let i = 0; i < tabsCount; i++) {
		const tabName = generateFieldId({ seed: config.seed });
		const tabFields: prismicT.CustomTypeModelTab = buildMockGroupFieldMap();

		if (i === 0 && config.withUID) {
			const fieldId = generateFieldId({ seed: config.seed });

			tabFields[fieldId] = uid();
		}

		if (config.withSliceZones) {
			const sliceZoneId = generateFieldId({ seed: config.seed });

			tabFields[sliceZoneId] = sliceZone({
				withSharedSlices: config.withSharedSlices,
			});
		}

		json[tabName] = tabFields;
	}

	const id = generateCustomTypeId({ seed: config.seed });

	return {
		id,
		label: changeCase.capitalCase(id),
		status: faker.datatype.boolean(),
		repeatable: faker.datatype.boolean(),
		json,
	};
};
