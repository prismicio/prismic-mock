import * as prismicT from "@prismicio/types";
import * as faker from "faker";
import * as changeCase from "change-case";

import { sharedSliceVariation } from "./sharedSliceVariation";

type SharedSliceArgs = {
	variationsCount?: number;
};

export const sharedSlice = (
	args: SharedSliceArgs = {},
): prismicT.SharedSliceModel => {
	const variationsCount =
		args.variationsCount ?? faker.datatype.number({ min: 1, max: 3 });

	const name = changeCase.capitalCase(faker.company.bsNoun());
	const variations = Array(variationsCount)
		.fill(undefined)
		.map(() => sharedSliceVariation());

	return {
		type: prismicT.CustomTypeModelSliceType.SharedSlice,
		id: changeCase.snakeCase(name),
		name,
		description: faker.lorem.sentence(),
		variations,
	};
};
