import { it, expect } from "vitest"

import * as prismicM from "../src"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Shared Slice model", ({ task }) => {
	snapshotTwice((name) => prismicM.model.sharedSlice({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => prismicM.model.sharedSlice({ seed: 1 }), task.name)
})

it("can be configured with a specific id", ({ task }) => {
	const actual = prismicM.model.sharedSlice({
		seed: task.name,
		id: "custom_id",
	})

	expect(actual.id).toBe("custom_id")
	expect(actual.name).toBe("CustomId")
})

it("can be configured with a specific name", ({ task }) => {
	const actual = prismicM.model.sharedSlice({
		seed: task.name,
		name: "Custom Name",
	})

	expect(actual.id).toBe("custom_name")
	expect(actual.name).toBe("Custom Name")
})

it("can be configured with a specific id and name", ({ task }) => {
	const actual = prismicM.model.sharedSlice({
		seed: task.name,
		id: "custom_id",
		name: "Custom Name",
	})

	expect(actual.id).toBe("custom_id")
	expect(actual.name).toBe("Custom Name")
})

it("can be configured with specific variations", ({ task }) => {
	const variations = [
		prismicM.model.sharedSliceVariation({ seed: task.name }),
		prismicM.model.sharedSliceVariation({ seed: task.name }),
	]

	const actual = prismicM.model.sharedSlice({
		seed: task.name,
		variations,
	})

	expect(actual.variations).toBe(variations)
})
