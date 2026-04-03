import { it } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock GeoPoint field model", ({ task }) => {
	snapshotTwice((name) => model.geoPoint({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.geoPoint({ seed: 1 }), task.name)
})
