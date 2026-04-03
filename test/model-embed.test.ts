import { it } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Embed field model", ({ task }) => {
	snapshotTwice((name) => model.embed({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.embed({ seed: 1 }), task.name)
})
