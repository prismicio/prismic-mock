import { it, expect } from "vitest"

import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock GeoPoint field value", ({ task }) => {
	snapshotTwice((name) => value.geoPoint({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.geoPoint({ seed: 1 }), task.name)
})

it("can be configured to return an empty value", ({ task }) => {
	const actual = value.geoPoint({
		seed: task.name,
		state: "empty",
	})

	expect(actual).toEqual({})
})
