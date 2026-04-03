import * as prismic from "@prismicio/client"
import { it, expect } from "vitest"

import * as prismicM from "../src"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Custom Type field model", ({ task }) => {
	snapshotTwice((name) => prismicM.model.customType({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => prismicM.model.customType({ seed: 1 }), task.name)
})

it("can be configured for specific fields", ({ task }) => {
	const actual = prismicM.model.customType({
		seed: task.name,
		fields: {
			boolean: prismicM.model.boolean({ seed: task.name }),
		},
	})

	expect(actual.json.Main.boolean.type).toBe(prismic.CustomTypeModelFieldType.Boolean)
})

it("can be configured for specific tabs", ({ task }) => {
	const actual = prismicM.model.customType({
		seed: task.name,
		tabs: {
			Main: {
				boolean: prismicM.model.boolean({ seed: task.name }),
			},
		},
	})

	expect(actual.json.Main.boolean.type).toBe(prismic.CustomTypeModelFieldType.Boolean)
})

it("can be configured for a specific format", ({ task }) => {
	const actual = prismicM.model.customType({
		seed: task.name,
		format: "page",
	})

	expect(actual.format).toBe("page")
})
