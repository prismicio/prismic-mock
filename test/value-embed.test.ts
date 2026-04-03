import { it, expect } from "vitest"

import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Embed field value", ({ task }) => {
	snapshotTwice((name) => value.embed({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.embed({ seed: 1 }), task.name)
})

it("can be configured to return an empty value", ({ task }) => {
	const actual = value.embed({
		seed: task.name,
		state: "empty",
	})

	expect(actual).toEqual({})
})
