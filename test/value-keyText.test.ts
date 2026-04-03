import { it, expect } from "vitest"

import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Key Text field value", ({ task }) => {
	snapshotTwice((name) => value.keyText({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.keyText({ seed: 1 }), task.name)
})

it("can be configured to return an empty value", ({ task }) => {
	const actual = value.keyText({
		seed: task.name,
		state: "empty",
	})

	expect(actual).toBe(null)
})
