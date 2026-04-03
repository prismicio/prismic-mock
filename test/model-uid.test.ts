import { it } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock UID field model", ({ task }) => {
	snapshotTwice((name) => model.uid({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.uid({ seed: 1 }), task.name)
})
