import * as prismicT from "@prismicio/types";
import * as faker from "faker/locale/en_US";
import * as changeCase from "change-case";
import {
	buildRandomGroupFieldMap,
	BuildRandomGroupFieldMapArgs,
} from "../buildRandomGroupFieldMap";

type GroupArgs = BuildRandomGroupFieldMapArgs;

export const group = (
	args: GroupArgs = {},
): prismicT.CustomTypeModelGroupField => {
	const fields = buildRandomGroupFieldMap({
		fieldArgs: args.fieldArgs,
		fieldCounts: args.fieldCounts,
	});

	return {
		type: prismicT.CustomTypeModelFieldType.Group,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			fields,
		},
	};
};
