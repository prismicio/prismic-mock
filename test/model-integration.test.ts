import { it, expect } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Integration Fields field model", ({ task }) => {
	snapshotTwice((name) => model.integration({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.integration({ seed: 1 }), task.name)
})

it("can be configured for a specific catalog", ({ task }) => {
	const catalog = "foo"
	const actual = model.integration({
		seed: task.name,
		catalog,
	})

	expect(actual.config?.catalog).toBe(catalog)
})
