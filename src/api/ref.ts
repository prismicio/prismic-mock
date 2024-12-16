import * as prismic from "@prismicio/client";

import { capitalCase } from "../lib/changeCase";
import { createFaker } from "../lib/createFaker";
import { MockRestApiConfig } from "../types";
import { timestamp } from "../value";

export type MockRestApiRefConfig<IsScheduled extends boolean = false> = {
	isMasterRef?: boolean;
	isScheduled?: IsScheduled;
} & MockRestApiConfig;

export type MockRestApiRefValue<IsScheduled extends boolean = false> = Omit<
	prismic.Ref,
	"scheduledAt"
> &
	(IsScheduled extends true
		? { scheduledAt: string }
		: { scheduledAt?: never });

export const ref = <IsScheduled extends boolean = false>(
	config: MockRestApiRefConfig<IsScheduled>,
): MockRestApiRefValue<IsScheduled> => {
	const faker = config.faker || createFaker(config.seed);

	const value: prismic.Ref = {
		id: faker.hash(16),
		ref: faker.hash(16),
		isMasterRef: config.isMasterRef ?? false,
		label: config.isMasterRef
			? "Master"
			: capitalCase(faker.words(faker.range(1, 3))),
	};

	if (config.isScheduled) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		value.scheduledAt = timestamp({ faker })!;
	}

	return value as MockRestApiRefValue<IsScheduled>;
};
