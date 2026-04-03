import { it } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Date field model", ({ task }) => {
	snapshotTwice((name) => model.date({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.date({ seed: 1 }), task.name)
})
