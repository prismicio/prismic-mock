import * as prismic from "@prismicio/client"
import { it, expect } from "vitest"

import * as prismicM from "../src"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Slice field model", ({ task }) => {
	snapshotTwice((name) => prismicM.model.slice({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => prismicM.model.slice({ seed: 1 }), task.name)
})

it("can be configured for specific non-repeat and repeat fields", ({ task }) => {
	const actual = prismicM.model.slice({
		seed: task.name,
		nonRepeatFields: {
			boolean: prismicM.model.boolean({ seed: task.name }),
		},
		repeatFields: {
			keyText: prismicM.model.keyText({ seed: task.name }),
		},
	})

	expect(actual["non-repeat"]?.boolean.type).toBe(prismic.CustomTypeModelFieldType.Boolean)
	expect(actual.repeat?.keyText.type).toBe(prismic.CustomTypeModelFieldType.Text)
})
