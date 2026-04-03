import * as prismic from "@prismicio/client"
import { it, expect } from "vitest"

import * as prismicM from "../src"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Shared Slice variation field model", ({ task }) => {
	snapshotTwice((name) => prismicM.model.sharedSliceVariation({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => prismicM.model.sharedSliceVariation({ seed: 1 }), task.name)
})

it("can be configured with a specific id", ({ task }) => {
	const actual = prismicM.model.sharedSliceVariation({
		seed: task.name,
		id: "custom_id",
	})

	expect(actual.id).toBe("custom_id")
	expect(actual.name).toBe("CustomId")
})

it("can be configured with a specific name", ({ task }) => {
	const actual = prismicM.model.sharedSliceVariation({
		seed: task.name,
		name: "Custom Name",
	})

	expect(actual.id).toBe("custom_name")
	expect(actual.name).toBe("Custom Name")
})

it("can be configured with a specific id and name", ({ task }) => {
	const actual = prismicM.model.sharedSliceVariation({
		seed: task.name,
		id: "custom_id",
		name: "Custom Name",
	})

	expect(actual.id).toBe("custom_id")
	expect(actual.name).toBe("Custom Name")
})

it("can be configured for specific primary and items fields", ({ task }) => {
	const actual = prismicM.model.sharedSliceVariation({
		seed: task.name,
		primaryFields: {
			boolean: prismicM.model.boolean({ seed: task.name }),
			group: prismicM.model.group({
				seed: task.name,
				fields: {
					boolean: prismicM.model.boolean({ seed: task.name }),
				},
			}),
		},
		itemsFields: {
			keyText: prismicM.model.keyText({ seed: task.name }),
		},
	})

	expect(actual.primary?.boolean.type).toBe(prismic.CustomTypeModelFieldType.Boolean)
	expect(actual.primary?.group.type).toBe(prismic.CustomTypeModelFieldType.Group)
	expect(actual.primary?.group.config?.fields?.boolean.type).toBe(
		prismic.CustomTypeModelFieldType.Boolean,
	)
	expect(actual.items?.keyText.type).toBe(prismic.CustomTypeModelFieldType.Text)
})
