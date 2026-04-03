import { it, expect } from "vitest"

import * as model from "../src/model"
import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Content Relationship field value", ({ task }) => {
	snapshotTwice((name) => value.contentRelationship({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.contentRelationship({ seed: 1 }), task.name)
})

it("supports custom model", ({ task }) => {
	const customModel = model.contentRelationship({
		seed: task.name,
		customTypeIDs: ["type"],
		tags: ["tag"],
	})

	const actual = value.contentRelationship({
		seed: task.name,
		model: customModel,
	})

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	expect(customModel.config?.customtypes!.includes(actual.type)).toBe(true)

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	expect(customModel.config?.tags!.every((tag) => actual.tags.includes(tag))).toBe(true)
})

it("can be configured to return an empty value", ({ task }) => {
	const actual = value.contentRelationship({
		seed: task.name,
		state: "empty",
	})

	expect("url" in actual).toBe(false)
})

it("can be configured to return a link from a given list of documents", ({ task }) => {
	const linkableDocuments = [
		value.document({ seed: task.name }),
		value.document({ seed: task.name }),
	]
	const actual = value.contentRelationship({
		seed: task.name,
		linkableDocuments,
	})

	expect(linkableDocuments.some((linkableDocument) => actual.id === linkableDocument.id)).toBe(true)
})

it("can be configured to return a link from a given list of documents with constraints", ({
	task,
}) => {
	const linkableDocuments = [
		{ ...value.document({ seed: task.name }), type: "foo", tags: ["bar"] },
		value.document({ seed: task.name }),
	]

	const customModel = model.contentRelationship({ seed: task.name })
	if (customModel.config) {
		customModel.config.customtypes = ["foo"]
		customModel.config.tags = ["bar"]
	}

	const actual = value.contentRelationship({
		seed: task.name,
		model: customModel,
		linkableDocuments,
	})

	expect(actual.id).toBe(linkableDocuments[0].id)
})

it("throws if a linkable document cannot be found within constraints", ({ task }) => {
	const linkableDocuments = [
		{
			...value.document({ seed: task.name }),
			type: "not-foo",
			tags: ["not-bar"],
		},
	]

	const customModel = model.contentRelationship({ seed: task.name })
	if (customModel.config) {
		customModel.config.customtypes = ["foo"]
		customModel.config.tags = ["bar"]
	}

	expect(() =>
		value.contentRelationship({
			seed: task.name,
			model: customModel,
			linkableDocuments,
		}),
	).toThrow(/could not be found/)
})
