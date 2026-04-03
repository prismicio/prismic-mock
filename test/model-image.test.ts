import { it, expect } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Image field model", ({ task }) => {
	snapshotTwice((name) => model.image({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.image({ seed: 1 }), task.name)
})

it("can be configured to include constraints", ({ task }) => {
	const actual = model.image({
		seed: task.name,
		withConstraint: true,
	})

	expect(typeof actual.config?.constraint?.width).toBe("number")
	expect(typeof actual.config?.constraint?.height).toBe("number")
})

it("can be configured for a specific thumbnails", ({ task }) => {
	const actual = model.image({
		seed: task.name,
		thumbnailNames: ["Foo"],
	})

	expect(actual.config?.thumbnails?.length).toBe(1)
	expect(actual.config?.thumbnails?.[0].name).toBe("Foo")
})
