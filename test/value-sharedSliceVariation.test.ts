import { it, expect } from "vitest"

import * as model from "../src/model"
import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Shared Slice Variation field value", ({ task }) => {
	snapshotTwice((name) => value.sharedSliceVariation({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.sharedSliceVariation({ seed: 1 }), task.name)
})

it("supports custom model", ({ task }) => {
	const customModel = model.sharedSliceVariation({
		seed: task.name,
		primaryFields: {
			boolean: model.boolean({ seed: task.name }),
			group: model.group({
				seed: task.name,
				fields: {
					boolean: model.boolean({ seed: task.name }),
				},
			}),
		},
		itemsFields: {
			keyText: model.keyText({ seed: task.name }),
		},
	})

	const actual = value.sharedSliceVariation({
		seed: task.name,
		model: customModel,
	})

	expect(typeof actual.primary.boolean).toBe("boolean")
	expect(Array.isArray(actual.primary.group)).toBe(true)
	for (const item of actual.primary.group) {
		expect(typeof item.boolean).toBe("boolean")
	}

	for (const item of actual.items) {
		expect(typeof item.keyText).toBe("string")
	}
})

it("returns no items if model does not include items model", ({ task }) => {
	const customModel = model.sharedSliceVariation({ seed: task.name })

	const actual = value.sharedSliceVariation({
		seed: task.name,
		model: customModel,
	})

	expect(actual.items.length).toBe(0)
})

it("can be customized with a specific number of items", ({ task }) => {
	const customModel = model.sharedSliceVariation({
		seed: task.name,
		itemsFields: {
			boolean: model.boolean({ seed: task.name }),
		},
	})

	const actualNone = value.sharedSliceVariation({
		seed: task.name,
		model: customModel,
		itemsCount: 5,
	})
	expect(actualNone.items.length).toBe(5)
})

it("can be customized to return a specific type", ({ task }) => {
	const actual = value.sharedSliceVariation({
		seed: task.name,
		type: "type",
	})

	expect(actual.slice_type).toBe("type")
})

it("slice_label is null", ({ task }) => {
	const actual = value.sharedSliceVariation({
		seed: task.name,
	})

	expect(actual.slice_label).toBe(null)
})
