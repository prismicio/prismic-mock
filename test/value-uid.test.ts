import { it } from "vitest"

import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock UID field value", ({ task }) => {
	snapshotTwice((name) => value.uid({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.uid({ seed: 1 }), task.name)
})
