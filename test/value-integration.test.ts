import { it, expect } from "vitest"

import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Integration Fields field value", ({ task }) => {
	snapshotTwice((name) => value.integration({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.integration({ seed: 1 }), task.name)
})

it("can be configured to return an empty value", ({ task }) => {
	const actual = value.integration({
		seed: task.name,
		state: "empty",
	})

	expect(actual).toBe(null)
})

it("can be configured to return provided data", ({ task }) => {
	const data = { foo: "bar" }
	const actual = value.integration({
		seed: task.name,
		data,
	})

	expect(actual).toBe(data)
})
