import { it } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Rich Text field model", ({ task }) => {
	snapshotTwice((name) => model.richText({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.richText({ seed: 1 }), task.name)
})

it("can be configured to always allow multiple blocks", ({ task }) => {
	snapshotTwice(
		(name) =>
			model.richText({
				seed: name,
				withMultipleBlocks: true,
			}),
		task.name,
	)
})
