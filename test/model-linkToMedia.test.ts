import { it, expect } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Link To Media field model", ({ task }) => {
	snapshotTwice((name) => model.linkToMedia({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.linkToMedia({ seed: 1 }), task.name)
})

it("can be configured to explicitly support the text property", ({ task }) => {
	const actualTrue = model.linkToMedia({
		seed: task.name,
		allowText: true,
	})
	expect(actualTrue.config.allowText).toBe(true)

	const actualFalse = model.linkToMedia({
		seed: task.name,
		allowText: false,
	})
	expect(actualFalse.config.allowText).toBe(undefined)
})
