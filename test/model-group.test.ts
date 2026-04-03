import * as prismic from "@prismicio/client"
import { it, expect } from "vitest"

import * as model from "../src/model"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Group field model", ({ task }) => {
	snapshotTwice((name) => model.group({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => model.group({ seed: 1 }), task.name)
})

it("can be configured for specific fields", ({ task }) => {
	const actual = model.group({
		seed: task.name,
		fields: {
			boolean: model.boolean({ seed: task.name }),
		},
	})

	expect(actual.config?.fields?.boolean.type).toBe(prismic.CustomTypeModelFieldType.Boolean)
})

it("supports nested groups", ({ task }) => {
	const actual = model.group({
		seed: task.name,
		fields: {
			group: model.group({
				seed: task.name,
				fields: {
					boolean: model.boolean({ seed: task.name }),
				},
			}),
		},
	})

	expect(actual.config?.fields?.group.type).toBe(prismic.CustomTypeModelFieldType.Group)
	expect(actual.config?.fields?.group.config?.fields?.boolean.type).toBe(
		prismic.CustomTypeModelFieldType.Boolean,
	)
})
