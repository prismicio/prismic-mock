import * as fakerStatic from "faker";
// @ts-expect-error - Missing .d.ts
import * as fakerLocaleEN from "faker/lib/locales/en";
// @ts-expect-error - Missing .d.ts
import Faker from "faker/lib";

import { FAKER_SEED } from "../constants";

export const createFaker = (seed = FAKER_SEED): typeof fakerStatic => {
	if (createFaker.cache[seed]) {
		return createFaker.cache[seed];
	}

	const seededFaker = new Faker();
	seededFaker.seed(seed);
	seededFaker.locales["en"] = fakerLocaleEN;

	createFaker.cache[seed] = seededFaker;

	return seededFaker;
};
createFaker.cache = {} as Record<number, typeof fakerStatic>;
