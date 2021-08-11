import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";

import { MockModelConfig } from "../types";

type MockLinkModel<AllowTargetBlank extends boolean = boolean> =
	prismicT.CustomTypeModelLinkField & {
		config: AllowTargetBlank extends true
			? {
					allowTargetBlank: true;
			  }
			: {
					allowTargetBlank?: undefined;
			  };
	};

export type MockLinkModelConfig<AllowTargetBlank extends boolean = boolean> = {
	allowTargetBlank?: AllowTargetBlank;
} & MockModelConfig;

export const link = <AllowTargetBlank extends boolean = boolean>(
	config: MockLinkModelConfig<AllowTargetBlank> = {},
): MockLinkModel<AllowTargetBlank> => {
	const faker = createFaker(config.seed);

	return {
		type: prismicT.CustomTypeModelFieldType.Link,
		config: {
			label: changeCase.capitalCase(faker.company.bsNoun()),
			placeholder: changeCase.sentenceCase(faker.lorem.words(3)),
			select: null,
			allowTargetBlank:
				("allowTargetBlank" in config
					? config.allowTargetBlank
					: faker.datatype.boolean()) || undefined,
		},
	} as MockLinkModel<AllowTargetBlank>;
};
