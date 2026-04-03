import { it, expect } from "vitest"

import * as model from "../src/model"
import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Group field value", ({ task }) => {
	snapshotTwice((name) => value.group({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.group({ seed: 1 }), task.name)
})

it("supports custom model", ({ task }) => {
	const customModel = model.group({
		seed: task.name,
		fields: {
			boolean: model.boolean({ seed: task.name }),
		},
	})

	const actual = value.group({
		seed: task.name,
		model: customModel,
	})

	for (const item of actual) {
		expect(typeof item.boolean).toBe("boolean")
	}
})

it("supports nested groups", ({ task }) => {
	const customModel = model.group({
		seed: task.name,
		fields: {
			group: model.group({
				seed: task.name,
				fields: {
					boolean: model.boolean({ seed: task.name }),
				},
			}),
		},
	})

	const actual = value.group({
		seed: task.name,
		model: customModel,
	})

	for (const item of actual) {
		for (const nestedItem of item.group) {
			expect(typeof nestedItem.boolean).toBe("boolean")
		}
	}
})

it("can be customized with a specific number of items", ({ task }) => {
	const actual = value.group({
		seed: task.name,
		itemsCount: 5,
	})

	expect(actual.length).toBe(5)
})
