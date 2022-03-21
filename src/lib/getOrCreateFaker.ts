import { Seed } from "../types";
import { createFaker, Faker } from "./createFaker";

type GetOrCreateFaker =
	| {
			seed?: Seed;
	  }
	| {
			faker: Faker;
	  };

export const getOrCreateFaker = (config: GetOrCreateFaker) => {
	if ("faker" in config) {
		return config.faker;
	} else {
		return createFaker(config.seed);
	}
};
