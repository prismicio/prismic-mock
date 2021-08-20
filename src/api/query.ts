import * as prismicT from "@prismicio/types";

import { createFaker } from "../lib/createFaker";

import { MockRestApiConfig } from "../types";

export type MockRestApiQueryConfig<
	Document extends prismicT.PrismicDocument = prismicT.PrismicDocument,
> = {
	documents?: Document[];
	page?: number;
	pageSize?: number;
} & MockRestApiConfig;

export const query = <
	Document extends prismicT.PrismicDocument = prismicT.PrismicDocument,
>(
	config: MockRestApiQueryConfig<Document> = {},
): prismicT.Query<Document> => {
	const faker = createFaker(config.seed);

	const documents = config.documents || [];
	const page = Math.max(1, config.page ?? 1);
	const pageSize = Math.min(100, Math.max(1, config.pageSize ?? 100));
	const totalPages = Math.ceil(documents.length / pageSize);
	const results = documents.slice((page - 1) * pageSize, page * pageSize);

	return {
		page,
		next_page: page < totalPages ? faker.internet.url() : null,
		prev_page: page > 1 ? faker.internet.url() : null,
		total_pages: totalPages,
		results_size: results.length,
		results_per_page: pageSize,
		total_results_size: documents.length,
		results,
	};
};
