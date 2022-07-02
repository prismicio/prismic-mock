import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { GroupFieldModelMap, MockModelConfig } from "../types";

export type MockSliceModelConfig<
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
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelSliceType.Slice,
		icon: changeCase.snakeCase(faker.word()),
		display: faker.boolean()
			? prismicT.CustomTypeModelSliceDisplay.Grid
			: prismicT.CustomTypeModelSliceDisplay.List,
		fieldset: changeCase.capitalCase(faker.words(2)),
		description: changeCase.sentenceCase(faker.words(faker.range(5, 10))),
		repeat: config.repeatFields || ({} as RepeatFields),
		"non-repeat": config.nonRepeatFields || ({} as NonRepeatFields),
	};
};
