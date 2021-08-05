import * as prismicT from "@prismicio/types";
import * as faker from "faker/locale/en_US";
import * as changeCase from "change-case";

import {
	buildRandomGroupFieldMap,
	BuildRandomGroupFieldMapFieldArgs,
	BuildRandomGroupFieldMapFieldCounts,
} from "../buildRandomGroupFieldMap";

type SliceChoiceArgs = {
	repeatFieldCounts?: BuildRandomGroupFieldMapFieldCounts;
	repeatFieldArgs?: BuildRandomGroupFieldMapFieldArgs;
	nonRepeatFieldCounts?: BuildRandomGroupFieldMapFieldCounts;
	nonRepeatFieldArgs?: BuildRandomGroupFieldMapFieldArgs;
};

export const sliceChoice = (
	args: SliceChoiceArgs = {},
): prismicT.CustomTypeModelSlice => {
	return {
		type: prismicT.CustomTypeModelSliceType.Slice,
		icon: changeCase.snakeCase(faker.company.bsNoun()),
		display: faker.datatype.boolean()
			? prismicT.CustomTypeModelSliceDisplay.Grid
			: prismicT.CustomTypeModelSliceDisplay.List,
		fieldset: changeCase.capitalCase(faker.lorem.words()),
		description: faker.lorem.sentence(),
		repeat: buildRandomGroupFieldMap({
			fieldCounts: args.repeatFieldCounts,
			fieldArgs: args.repeatFieldArgs,
		}),
		"non-repeat": buildRandomGroupFieldMap({
			fieldCounts: args.nonRepeatFieldCounts,
			fieldArgs: args.nonRepeatFieldArgs,
		}),
	};
};
