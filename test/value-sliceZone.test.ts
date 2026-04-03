import { it, expect } from "vitest"

import * as model from "../src/model"
import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Slice Zone field value", ({ task }) => {
	snapshotTwice((name) => value.sliceZone({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.sliceZone({ seed: 1 }), task.name)
})

it("can be customized with a specific number of Slices", ({ task }) => {
	const customModel = model.sliceZone({
		seed: task.name,
		choices: {
			foo: model.slice({ seed: task.name }),
		},
	})

	const actual = value.sliceZone({
		seed: task.name,
		model: customModel,
		itemsCount: 5,
	})
	expect(actual.length).toBe(5)
})

it("can be provided with a list of Shared Slice models for Slice Zones containing Shared Slices", ({
	task,
}) => {
	const seed = task.name

	const customModel = model.sliceZone({
		seed,
		choices: {
			foo: model.sharedSliceChoice(),
		},
	})

	const sharedSliceModel = model.sharedSlice({
		seed,
		id: "foo",
		variations: [model.sharedSliceVariation({ seed: task.name })],
	})

	const actual = value.sliceZone({
		seed,
		model: customModel,
		sharedSliceModels: [sharedSliceModel],
	})

	expect(actual.every((slice) => slice.slice_type === sharedSliceModel.id)).toBe(true)
})

it("Shared Slices not provided are omitted from the return value", ({ task }) => {
	const seed = task.name

	const customModel = model.sliceZone({
		seed: task.name,
		choices: {
			foo: model.sharedSliceChoice(),
			bar: model.sharedSliceChoice(),
		},
	})
	const sharedSliceModel = model.sharedSlice({
		seed: task.name,
		id: "foo",
		variations: [model.sharedSliceVariation({ seed: task.name })],
	})

	const actual = value.sliceZone({
		seed,
		model: customModel,
		sharedSliceModels: [sharedSliceModel],
	})

	expect(actual.every((slice) => slice.slice_type === sharedSliceModel.id)).toBe(true)
})
