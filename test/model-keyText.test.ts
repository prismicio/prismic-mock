import { it } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Key Text field model", ({ task }) => {
	snapshotTwice((name) => model.keyText({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.keyText({ seed: 1 }), task.name)
})
