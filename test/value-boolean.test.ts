import { it } from "vitest"

import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Boolean field value", ({ task }) => {
	snapshotTwice((name) => value.boolean({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.boolean({ seed: 1 }), task.name)
})
