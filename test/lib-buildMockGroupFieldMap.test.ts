import { it } from "vitest"

import * as prismicM from "../src"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates mock field models for group field", ({ task }) => {
	snapshotTwice((name) => prismicM.model.buildMockGroupFieldMap({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => prismicM.model.buildMockGroupFieldMap({ seed: 1 }), task.name)
})
