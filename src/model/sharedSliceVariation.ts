import * as prismicT from "@prismicio/types";
import * as faker from "faker/locale/en_US";
import * as changeCase from "change-case";

import {
	buildRandomGroupFieldMap,
	BuildRandomGroupFieldMapFieldArgs,
	BuildRandomGroupFieldMapFieldCounts,
} from "../buildRandomGroupFieldMap";

type SharedSliceVariationArgs = {
	primaryFieldCounts?: BuildRandomGroupFieldMapFieldCounts;
	primaryFieldArgs?: BuildRandomGroupFieldMapFieldArgs;
	itemsFieldCounts?: BuildRandomGroupFieldMapFieldCounts;
	itemsFieldArgs?: BuildRandomGroupFieldMapFieldArgs;
};

export const sharedSliceVariation = (
	args: SharedSliceVariationArgs = {},
): prismicT.SharedSliceModelVariation => {
	const name = changeCase.capitalCase(faker.company.bsNoun());

	return {
		id: changeCase.snakeCase(name),
		name,
		description: faker.lorem.sentence(),
		docURL: faker.internet.url(),
		version: faker.git.shortSha(),
		primary: buildRandomGroupFieldMap({
			fieldCounts: args.itemsFieldCounts,
			fieldArgs: args.itemsFieldArgs,
		}),
		items: buildRandomGroupFieldMap({
			fieldCounts: args.primaryFieldCounts,
			fieldArgs: args.primaryFieldArgs,
		}),
	};
};
