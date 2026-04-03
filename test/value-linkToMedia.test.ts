import { it, expect } from "vitest"

import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Link To Media field value", ({ task }) => {
	snapshotTwice((name) => value.linkToMedia({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.linkToMedia({ seed: 1 }), task.name)
})

it("can be configured to return an empty value", ({ task }) => {
	const actual = value.linkToMedia({
		seed: task.name,
		state: "empty",
	})

	expect("url" in actual).toBe(false)
})

it("can be configured to return a value with display text", ({ task }) => {
	const actualTrue = value.linkToMedia({
		seed: task.name,
		withText: true,
	})
	expect(typeof actualTrue.text).toBe("string")

	const actualFalse = value.linkToMedia({
		seed: task.name,
		withText: false,
	})
	expect(actualFalse.text).toBe(undefined)
})
