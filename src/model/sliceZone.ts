import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

import { sharedSliceChoice } from "./sharedSliceChoice";
import { sliceChoice } from "./sliceChoice";

type SliceZoneArgs = {
	choicesCount?: number;
	withSharedSlices?: boolean;
};

export const sliceZone = (
	args: SliceZoneArgs = {},
): prismicT.CustomTypeModelSliceZoneField => {
	const choicesCount =
		args.choicesCount ?? faker.datatype.number({ min: 2, max: 6 });

	const choices: Record<
		string,
		prismicT.CustomTypeModelSlice | prismicT.CustomTypeModelSharedSlice
	> = {};
	for (let i = 0; i < choicesCount; i++) {
		const choiceId = changeCase.snakeCase(
			faker.lorem.words(faker.datatype.number({ min: 1, max: 3 })),
		);

		choices[choiceId] = args.withSharedSlices
			? sharedSliceChoice()
			: sliceChoice();
	}

	const labels = {} as Record<string, prismicT.CustomTypeModelSliceLabel[]>;
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
