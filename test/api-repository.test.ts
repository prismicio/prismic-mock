import { it, expect } from "vitest"

import * as mock from "../src"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock repository value", ({ task }) => {
	snapshotTwice((name) => mock.api.repository({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => mock.api.repository({ seed: 1 }), task.name)
})

it("can be configured to include releases", ({ task }) => {
	const actual = mock.api.repository({
		seed: task.name,
		withReleases: true,
	})

	expect(actual.refs.filter((ref) => !ref.isMasterRef).length > 0).toBe(true)
})

it("can be configured to include custom types", ({ task }) => {
	const seed = task.name

	const customTypeModels = [mock.model.customType({ seed }), mock.model.customType({ seed })]

	const actual = mock.api.repository({ seed, customTypeModels })

	expect(actual.types).toEqual({
		[customTypeModels[0].id]: customTypeModels[0].label,
		[customTypeModels[1].id]: customTypeModels[1].label,
	})
})
