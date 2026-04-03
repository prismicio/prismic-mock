import { it, expect } from "vitest"

import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Timestamp field value", ({ task }) => {
	snapshotTwice((name) => value.timestamp({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.timestamp({ seed: 1 }), task.name)
})

it("can be configured to return an empty value", ({ task }) => {
	const actual = value.timestamp({
		seed: task.name,
		state: "empty",
	})

	expect(actual).toBe(null)
})

it("can be configured to return a timestamp after and before given timestamps", ({ task }) => {
	const after = new Date(1984, 0, 1)
	const before = new Date(1984, 0, 3)

	const actual = value.timestamp({
		seed: task.name,
		after,
		before,
	})
	const actualTime = new Date(actual).getTime()

	expect(before.getTime() > actualTime).toBe(true)
	expect(after.getTime() < actualTime).toBe(true)
})
