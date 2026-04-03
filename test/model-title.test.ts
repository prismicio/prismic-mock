import { it } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Title field model", ({ task }) => {
	snapshotTwice((name) => model.title({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.title({ seed: 1 }), task.name)
})
