import { it, expect } from "vitest"

import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Number field value", ({ task }) => {
	snapshotTwice((name) => value.number({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.number({ seed: 1 }), task.name)
})

it("can be configured to return an empty value", ({ task }) => {
	const actual = value.number({
		seed: task.name,
		state: "empty",
	})

	expect(actual).toBe(null)
})
