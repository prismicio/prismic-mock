import { it } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Shared Slice choice field model", ({ task }) => {
	snapshotTwice(() => model.sharedSliceChoice(), task.name)
})
