import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as mock from "../src";

test("creates a mock query value", snapshotTwiceMacro, (t) =>
	mock.api.query({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	mock.api.query({ seed: 1 }),
);

test("can be configured to return a set of documents", (t) => {
	const seed = t.title;

	const documents = Array(20)
		.fill(undefined)
		.map(() => mock.value.document({ seed }));

	const actual = mock.api.query({ seed, documents });

	t.deepEqual(actual.results, documents);
});

test("can be configured to return paginated results", (t) => {
	const seed = t.title;

	const documents = Array(100)
		.fill(undefined)
		.map(() => mock.value.document({ seed }));
	const page = 2;
	const pageSize = 10;

	const actual = mock.api.query({
		seed,
		documents,
		page: 2,
		pageSize: 10,
	});

	t.is(actual.results.length, pageSize);
	t.is(actual.page, page);
	t.is(actual.total_pages, Math.ceil(documents.length / pageSize));
	t.is(typeof actual.next_page, "string");
	t.is(typeof actual.prev_page, "string");
	t.is(actual.results_size, pageSize);
	t.is(actual.results_per_page, pageSize);

	t.deepEqual(actual.results, documents.slice(10, 20));
});
