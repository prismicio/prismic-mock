import * as prismicT from "@prismicio/types";

import { createFaker, Faker } from "../lib/createFaker";

import { Seed } from "../types";

import { query, MockRestApiQueryConfig } from "./query";
import { ref, MockRestApiRefConfig } from "./ref";
import { repository, MockRestApiRepositoryConfig } from "./repository";
import { tags, MockRestApiTagsConfig } from "./tags";

export const createAPIMockFactory = (
	...args: ConstructorParameters<typeof APIMockFactory>
): APIMockFactory => {
	return new APIMockFactory(...args);
};

type WithoutFakerConfig<T> = Omit<T, "faker" | "seed">;

type APIMockFactoryConfig =
	| {
			seed: Seed;
	  }
	| {
			faker: Faker;
	  };

export class APIMockFactory {
	private faker: Faker;

	constructor(config: APIMockFactoryConfig) {
		this.faker = "faker" in config ? config.faker : createFaker(config.seed);
	}

	get seed() {
		return this.faker.seed;
	}

	query<Document extends prismicT.PrismicDocument = prismicT.PrismicDocument>(
		config?: WithoutFakerConfig<MockRestApiQueryConfig<Document>>,
	) {
		return query({ ...config, faker: this.faker });
	}

	ref<IsScheduled extends boolean = false>(
		config?: WithoutFakerConfig<MockRestApiRefConfig<IsScheduled>>,
	) {
		return ref({ ...config, faker: this.faker });
	}

	repository(config?: WithoutFakerConfig<MockRestApiRepositoryConfig>) {
		return repository({ ...config, faker: this.faker });
	}

	tags(config?: WithoutFakerConfig<MockRestApiTagsConfig>) {
		return tags({ ...config, faker: this.faker });
	}
}
