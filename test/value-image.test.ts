import { it, expect } from "vitest"

import * as model from "../src/model"
import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Image field value", ({ task }) => {
	snapshotTwice((name) => value.image({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.image({ seed: 1 }), task.name)
})

it("can be configured to return an empty value", ({ task }) => {
	const customModel = model.image({ seed: task.name })
	if (customModel.config) {
		customModel.config.thumbnails = [
			{
				name: "Foo",
				height: null,
				width: null,
			},
		]
	}

	const actual = value.image({
		seed: task.name,
		model: customModel,
		state: "empty",
	})

	expect(actual).toEqual({
		id: null,
		url: null,
		alt: null,
		copyright: null,
		dimensions: null,
		Foo: {
			id: null,
			url: null,
			alt: null,
			copyright: null,
			dimensions: null,
		},
	})
})

it("supports custom model", ({ task }) => {
	const customModel = model.image({
		seed: task.name,
		withConstraint: true,
		thumbnailNames: ["Foo"],
	})

	const actual = value.image({
		seed: task.name,
		model: customModel,
	})

	expect(actual.dimensions.width).toBe(customModel.config?.constraint?.width as number)
	expect(actual.dimensions.height).toBe(customModel.config?.constraint?.height as number)
	expect("Foo" in actual).toBe(true)
})
