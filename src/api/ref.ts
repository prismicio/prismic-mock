import * as prismicT from "@prismicio/types";
import * as changeCase from "change-case";

import { createFaker } from "../lib/createFaker";
import { MockRestApiConfig } from "../types";
import { timestamp } from "../value";

export type MockRestApiRefConfig<IsScheduled extends boolean = false> = {
	isMasterRef?: boolean;
	isScheduled?: IsScheduled;
} & MockRestApiConfig;

export type MockRestApiRefValue<IsScheduled extends boolean = false> = Omit<
	prismicT.Ref,
	"scheduledAt"
> &
	(IsScheduled extends true
		? { scheduledAt: string }
		: { scheduledAt?: never });

export const ref = <IsScheduled extends boolean = false>(
	config: MockRestApiRefConfig<IsScheduled> = {},
): MockRestApiRefValue<IsScheduled> => {
	const faker = createFaker(config.seed);

	const value: prismicT.Ref = {
		id: faker.git.shortSha(),
		ref: faker.git.shortSha(),
		isMasterRef: config.isMasterRef ?? false,
		label: config.isMasterRef
			? "Master"
			: changeCase.capitalCase(faker.company.bsNoun()),
	};

	if (config.isScheduled) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		value.scheduledAt = timestamp({ seed: config.seed })!;
	}

	return value as MockRestApiRefValue<IsScheduled>;
};
