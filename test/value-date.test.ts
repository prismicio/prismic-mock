import { it, expect } from "vitest"

import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Date field value", ({ task }) => {
	snapshotTwice((name) => value.date({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.date({ seed: 1 }), task.name)
})

it("can be configured to return an empty value", ({ task }) => {
	const actual = value.date({
		seed: task.name,
		state: "empty",
	})

	expect(actual).toBe(null)
})

it("can be configured to return a date after and before given dates", ({ task }) => {
	const actual = value.date({
		seed: task.name,
		after: new Date("1984-01-01T00:00:00.000Z"),
		before: new Date("1984-01-01T00:00:00.000Z"),
	})

	// Interval is [before, after]
	expect(actual).toBe("1984-01-01")
})
