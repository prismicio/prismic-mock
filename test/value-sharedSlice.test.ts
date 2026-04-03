import { it, expect } from "vitest"

import * as model from "../src/model"
import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Shared Slice field value", ({ task }) => {
	snapshotTwice((name) => value.sharedSlice({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.sharedSlice({ seed: 1 }), task.name)
})

it("supports custom model", ({ task }) => {
	const customModel = model.sharedSlice({
		seed: task.name,
		variations: [
			model.sharedSliceVariation({
				seed: task.name,
				primaryFields: {
					boolean: model.boolean({ seed: task.name }),
				},
				itemsFields: {
					boolean: model.boolean({ seed: task.name }),
				},
			}),
		],
	})

	const actual = value.sharedSlice({
		seed: task.name,
		model: customModel,
	})

	expect(Object.values(actual.primary).every((field) => typeof field === "boolean")).toBe(true)

	expect(
		actual.items.every((item) => Object.values(item).every((field) => typeof field === "boolean")),
	).toBe(true)
})

it("returns no items if model does not include items model", ({ task }) => {
	const seed = task.name

	const customModel = model.sharedSlice({
		seed,
		variations: [model.sharedSliceVariation({ seed: task.name })],
	})

	const actual = value.sharedSlice({ seed, model: customModel })

	expect(actual.items.length).toBe(0)
})

it("can be customized with a specific number of items", ({ task }) => {
	const customModel = model.sharedSlice({
		seed: task.name,
		variations: [
			model.sharedSliceVariation({
				seed: task.name,
				itemsFields: {
					boolean: model.boolean({ seed: task.name }),
				},
			}),
		],
	})

	const actual = value.sharedSlice({
		seed: task.name,
		model: customModel,
		itemsCount: 5,
	})
	expect(actual.items.length).toBe(5)
})
