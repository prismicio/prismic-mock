import { it, expect } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Select field model", ({ task }) => {
	snapshotTwice((name) => model.select({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.select({ seed: 1 }), task.name)
})

it("can be configured for a specific options", ({ task }) => {
	const options = ["foo", "bar"]
	const actual = model.select({
		seed: task.name,
		options,
	})

	expect(actual.config?.options).toBe(options)
})

it("can be configured for a specific default value", ({ task }) => {
	const actual = model.select({
		seed: task.name,
		options: ["foo", "bar"],
		defaultValue: "foo",
	})

	expect(actual.config?.default_value).toBe("foo")
})
