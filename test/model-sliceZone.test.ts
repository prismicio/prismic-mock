import { it, expect } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Slice Zone field model", ({ task }) => {
	snapshotTwice((name) => model.sliceZone({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.sliceZone({ seed: 1 }), task.name)
})

it("can be configured to use specific choices", ({ task }) => {
	const choices = {
		foo: model.slice({ seed: task.name }),
		bar: model.slice({ seed: task.name }),
	}

	const actual = model.sliceZone({
		seed: task.name,
		choices,
	})

	expect(actual.config?.choices).toEqual(choices)
})
