import { it, expect } from "vitest"

import * as mock from "../src"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock query value", ({ task }) => {
	snapshotTwice((name) => mock.api.query({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => mock.api.query({ seed: 1 }), task.name)
})

it("can be configured to return a set of documents", ({ task }) => {
	const seed = task.name

	const documents = Array(20)
		.fill(undefined)
		.map(() => mock.value.document({ seed }))

	const actual = mock.api.query({ seed, documents })

	expect(actual.results).toEqual(documents)
})

it("can be configured to return paginated results", ({ task }) => {
	const seed = task.name

	const documents = Array(100)
		.fill(undefined)
		.map(() => mock.value.document({ seed }))
	const page = 2
	const pageSize = 10

	const actual = mock.api.query({
		seed,
		documents,
		page: 2,
		pageSize: 10,
	})

	expect(actual.results.length).toBe(pageSize)
	expect(actual.page).toBe(page)
	expect(actual.total_pages).toBe(Math.ceil(documents.length / pageSize))
	expect(typeof actual.next_page).toBe("string")
	expect(typeof actual.prev_page).toBe("string")
	expect(actual.results_size).toBe(pageSize)
	expect(actual.results_per_page).toBe(pageSize)

	expect(actual.results).toEqual(documents.slice(10, 20))
})
