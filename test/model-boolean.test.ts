import { it } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Boolean field model", ({ task }) => {
	snapshotTwice((name) => model.boolean({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.boolean({ seed: 1 }), task.name)
})
