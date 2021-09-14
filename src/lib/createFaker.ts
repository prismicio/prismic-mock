import * as fakerStatic from "faker";
// @ts-expect-error - Missing .d.ts
import * as fakerLocaleEN from "faker/lib/locales/en/index.js";
// @ts-expect-error - Missing .d.ts
import Faker from "faker/lib/index.js";

import { FAKER_SEED } from "../constants";

export const createFaker = (seed = FAKER_SEED): typeof fakerStatic => {
	let normalizedSeed: number | number[];
	if (typeof seed === "string") {
		normalizedSeed = seed.split("").map((char) => char.charCodeAt(0));
	} else {
		normalizedSeed = seed;
	}

	const cacheKey = JSON.stringify(normalizedSeed);

	if (createFaker.cache[cacheKey]) {
		return createFaker.cache[cacheKey];
	}

	const fakerInstance = new Faker();
	fakerInstance.locales["en"] = fakerLocaleEN;
	fakerInstance.seed(normalizedSeed);

	createFaker.cache[cacheKey] = fakerInstance;

	return fakerInstance;
};
createFaker.cache = {} as Record<string, typeof fakerStatic>;
