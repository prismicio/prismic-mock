import * as prismic from "@prismicio/client";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig, NestedGroupFieldModelMap } from "../types";

export type MockSliceModelConfig<
	NonRepeatFields extends NestedGroupFieldModelMap = NestedGroupFieldModelMap,
	RepeatFields extends NestedGroupFieldModelMap = NestedGroupFieldModelMap,
> = {
	nonRepeatFields?: NonRepeatFields;
	repeatFields?: RepeatFields;
} & MockModelConfig;

export const slice = <
	NonRepeatFields extends NestedGroupFieldModelMap,
	RepeatFields extends NestedGroupFieldModelMap,
>(
	config: MockSliceModelConfig<NonRepeatFields, RepeatFields>,
): prismic.CustomTypeModelSlice<NonRepeatFields, RepeatFields> => {
	const faker = config.faker || createFaker(config.seed);

	return {
		type: prismic.CustomTypeModelSliceType.Slice,
		icon: changeCase.snakeCase(faker.word()),
		display: faker.boolean()
			? prismic.CustomTypeModelSliceDisplay.Grid
			: prismic.CustomTypeModelSliceDisplay.List,
		fieldset: changeCase.capitalCase(faker.words(2)),
		description: changeCase.sentenceCase(faker.words(faker.range(5, 10))),
		repeat: config.repeatFields || ({} as RepeatFields),
		"non-repeat": config.nonRepeatFields || ({} as NonRepeatFields),
	};
};
