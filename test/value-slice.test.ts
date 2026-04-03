import { it, expect } from "vitest"

import * as model from "../src/model"
import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Slice field value", ({ task }) => {
	snapshotTwice((name) => value.slice({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.slice({ seed: 1 }), task.name)
})

it("supports custom model", ({ task }) => {
	const customModel = model.slice({
		seed: task.name,
		nonRepeatFields: {
			boolean: model.boolean({ seed: task.name }),
		},
		repeatFields: {
			keyText: model.keyText({ seed: task.name }),
		},
	})

	const actual = value.slice({
		seed: task.name,
		model: customModel,
	})

	expect(typeof actual.primary.boolean).toBe("boolean")

	for (const item of actual.items) {
		expect(typeof item.keyText).toBe("string")
	}
})

it("returns no items if model does not include repeat model", ({ task }) => {
	const customModel = model.slice({ seed: task.name })

	const actual = value.slice({
		seed: task.name,
		model: customModel,
	})

	expect(actual.items.length).toBe(0)
})

it("can be customized with a specific number of items", ({ task }) => {
	const customModel = model.slice({
		seed: task.name,
		repeatFields: {
			boolean: model.boolean({ seed: task.name }),
		},
	})

	const actual = value.slice({
		seed: task.name,
		model: customModel,
		itemsCount: 5,
	})
	expect(actual.items.length).toBe(5)
})

it("can be customized to return a specific type", ({ task }) => {
	const actual = value.slice({
		seed: task.name,
		type: "type",
	})

	expect(actual.slice_type).toBe("type")
})

it("can be customized to return a specific label", ({ task }) => {
	const actual = value.slice({
		seed: task.name,
		label: "label",
	})

	expect(actual.slice_label).toBe("label")
})
