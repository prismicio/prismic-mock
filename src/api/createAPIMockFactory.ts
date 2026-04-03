import type * as prismic from "@prismicio/client"

import { createFaker, type Faker } from "../lib/createFaker"
import type { Seed, WithoutFakerConfig } from "../types"
import { query, type MockRestApiQueryConfig } from "./query"
import { ref, type MockRestApiRefConfig } from "./ref"
import { repository, type MockRestApiRepositoryConfig } from "./repository"
import { tags, type MockRestApiTagsConfig } from "./tags"

export const createAPIMockFactory = (
	...args: ConstructorParameters<typeof APIMockFactory>
): APIMockFactory => {
	return new APIMockFactory(...args)
}

type APIMockFactoryConfig =
	| {
			seed: Seed
	  }
	| {
			faker: Faker
	  }

export class APIMockFactory {
	private faker: Faker

	constructor(config: APIMockFactoryConfig) {
		this.faker = "faker" in config ? config.faker : createFaker(config.seed)
	}

	get seed(): Seed {
		return this.faker.seed
	}

	query<Document extends prismic.PrismicDocument = prismic.PrismicDocument>(
		config?: WithoutFakerConfig<MockRestApiQueryConfig<Document>>,
	): prismic.Query<Document> {
		return query({ ...config, faker: this.faker })
	}

	ref<IsScheduled extends boolean = false>(
		config?: WithoutFakerConfig<MockRestApiRefConfig<IsScheduled>>,
	): ReturnType<typeof ref<IsScheduled>> {
		return ref({ ...config, faker: this.faker })
	}

	repository(config?: WithoutFakerConfig<MockRestApiRepositoryConfig>): prismic.Repository {
		return repository({ ...config, faker: this.faker })
	}

	tags(config?: WithoutFakerConfig<MockRestApiTagsConfig>): prismic.Tags {
		return tags({ ...config, faker: this.faker })
	}
}
