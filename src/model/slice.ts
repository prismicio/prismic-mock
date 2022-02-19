import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { GroupFieldModelMap, MockModelConfig } from "../types";

type MockSliceModelConfig<
	NonRepeatFields extends GroupFieldModelMap = GroupFieldModelMap,
	RepeatFields extends GroupFieldModelMap = GroupFieldModelMap,
> = {
	nonRepeatFields?: NonRepeatFields;
	repeatFields?: RepeatFields;
} & MockModelConfig;

export const slice = <
	NonRepeatFields extends GroupFieldModelMap,
	RepeatFields extends GroupFieldModelMap,
>(
	config: MockSliceModelConfig<NonRepeatFields, RepeatFields> = {},
): prismicT.CustomTypeModelSlice<NonRepeatFields, RepeatFields> => {
	const faker = createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelSliceType.Slice,
		icon: changeCase.snakeCase(faker.company.bsNoun()),
		display: faker.datatype.boolean()
			? prismicT.CustomTypeModelSliceDisplay.Grid
			: prismicT.CustomTypeModelSliceDisplay.List,
		fieldset: changeCase.capitalCase(faker.lorem.words()),
		description: faker.lorem.sentence(),
		repeat: config.repeatFields || ({} as RepeatFields),
		"non-repeat": config.nonRepeatFields || ({} as NonRepeatFields),
	};
};
