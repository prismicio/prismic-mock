import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";
import { generateFieldId } from "../lib/generateFieldId";

import { MockModelConfig } from "../types";

import { sharedSliceChoice } from "./sharedSliceChoice";
import { slice } from "./slice";

type MockSliceZoneModelConfig = {
	choicesCount?: number;
	withSharedSlices?: boolean;
} & MockModelConfig;

export const sliceZone = (
	config: MockSliceZoneModelConfig = {},
): prismicT.CustomTypeModelSliceZoneField => {
	const faker = createFaker(config.seed);

	const choicesCount =
		config.choicesCount ?? faker.datatype.number({ min: 2, max: 6 });

	const choices: Record<
		string,
		prismicT.CustomTypeModelSlice | prismicT.CustomTypeModelSharedSlice
	> = {};
	for (let i = 0; i < choicesCount; i++) {
		const choiceId = generateFieldId({ seed: config.seed });

		choices[choiceId] = config.withSharedSlices
			? sharedSliceChoice()
			: slice({ seed: config.seed });
	}

	const labels: Record<string, prismicT.CustomTypeModelSliceLabel[]> = {};
	for (const choiceId in choices) {
		const labelsCount = faker.datatype.number({ min: 0, max: 3 });

		labels[choiceId] = Array(labelsCount)
			.fill(undefined)
			.map(() => ({
				name: changeCase.capitalCase(faker.company.bsNoun()),
				display: faker.datatype.boolean()
					? prismicT.CustomTypeModelSliceDisplay.Grid
					: prismicT.CustomTypeModelSliceDisplay.List,
			}));
	}

	return {
		type: prismicT.CustomTypeModelFieldType.Slices,
		fieldset: "Slice zone",
		config: {
			labels,
			choices,
		},
	};
};
