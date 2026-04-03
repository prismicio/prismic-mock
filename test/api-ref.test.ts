import { it, expect } from "vitest"

import * as mock from "../src"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock ref value", ({ task }) => {
	snapshotTwice((name) => mock.api.ref({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => mock.api.ref({ seed: 1 }), task.name)
})

it("can be configured to return a master ref", ({ task }) => {
	const actual = mock.api.ref({
		seed: task.name,
		isMasterRef: true,
	})

	expect(actual.isMasterRef).toBe(true)
	expect(actual.label).toBe("Master")
})

it("can be configured to return a scheduled ref", ({ task }) => {
	const actual = mock.api.ref({
		seed: task.name,
		isScheduled: true,
	})

	expect(typeof actual.scheduledAt).toBe("string")
})
