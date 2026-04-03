import { it } from "vitest"

import * as mock from "../src"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock tags value", ({ task }) => {
	snapshotTwice((name) => mock.api.tags({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => mock.api.tags({ seed: 1 }), task.name)
})
