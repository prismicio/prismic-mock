import { it, expect } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Content Relationship field model", ({ task }) => {
	snapshotTwice((name) => model.contentRelationship({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.contentRelationship({ seed: 1 }), task.name)
})

it("can be configured to constrain by custom type", ({ task }) => {
	const customTypeIDs = ["foo", "bar"]
	const actual = model.contentRelationship({
		seed: task.name,
		customTypeIDs,
	})

	expect(actual.config?.customtypes).toBe(customTypeIDs)
})

it("can be configured to constrain by tags", ({ task }) => {
	const tags = ["foo", "bar"]
	const actual = model.contentRelationship({
		seed: task.name,
		tags,
	})

	expect(actual.config?.tags).toBe(tags)
})
