import { it, expect } from "vitest"

import * as model from "../src/model"
import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Select field value", ({ task }) => {
	snapshotTwice((name) => value.select({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.select({ seed: 1 }), task.name)
})

it("can be configured to return an empty value", ({ task }) => {
	const actual = value.select({
		seed: task.name,
		state: "empty",
	})

	expect(actual).toBe(null)
})

it("supports custom model", ({ task }) => {
	const seed = task.name

	const customModel = model.select({
		seed,
		options: ["foo", "bar"],
	})

	const actual = value.select({ seed, model: customModel })

	expect(customModel.config?.options?.includes(actual)).toBe(true)
})
