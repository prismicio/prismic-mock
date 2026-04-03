import { it, expect } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Link field model", ({ task }) => {
	snapshotTwice((name) => model.link({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.link({ seed: 1 }), task.name)
})

it("can be configured to explicitly support blank target", ({ task }) => {
	const actualTrue = model.link({
		seed: task.name,
		allowTargetBlank: true,
	})
	expect(actualTrue.config.allowTargetBlank).toBe(true)

	const actualFalse = model.link({
		seed: task.name,
		allowTargetBlank: false,
	})
	expect(actualFalse.config.allowTargetBlank).toBe(undefined)
})

it("can be configured to explicitly support the text property", ({ task }) => {
	const actualTrue = model.link({
		seed: task.name,
		allowText: true,
	})
	expect(actualTrue.config.allowText).toBe(true)

	const actualFalse = model.link({
		seed: task.name,
		allowText: false,
	})
	expect(actualFalse.config.allowText).toBe(undefined)
})

it("can be configured to be repeatable", ({ task }) => {
	const actualTrue = model.link({
		seed: task.name,
		repeat: true,
	})
	expect(actualTrue.config.repeat).toBe(true)

	const actualFalse = model.link({
		seed: task.name,
		repeat: false,
	})
	expect(actualFalse.config.repeat).toBe(undefined)
})
