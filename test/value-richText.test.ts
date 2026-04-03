import { it, expect } from "vitest"

import * as model from "../src/model"
import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock RichText field value", ({ task }) => {
	snapshotTwice((name) => value.richText({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.richText({ seed: 1 }), task.name)
})

it("supports custom model", ({ task }) => {
	const customModel = model.richText({
		seed: task.name,
		withMultipleBlocks: false,
	})
	if (customModel.config) {
		customModel.config.single = "paragraph"
	}

	const actual = value.richText({
		seed: task.name,
		model: customModel,
	})

	expect(actual[0]?.type).toBe(customModel.config?.single as (typeof actual)[number]["type"])
})

it("models without multiple blocks returns one block", ({ task }) => {
	const customModel = model.richText({
		seed: task.name,
		withMultipleBlocks: false,
	})
	if (customModel.config) {
		customModel.config.single = "paragraph"
	}

	const actual = value.richText({
		seed: task.name,
		model: customModel,
	})

	expect(actual.length).toBe(1)
})

it("can be customized with a pattern to determine richText length", ({ task }) => {
	const customModel = model.richText({
		seed: task.name,
		withMultipleBlocks: true,
	})

	const actualShort = value.richText({
		seed: task.name,
		pattern: "short",
		model: customModel,
	})
	expect(actualShort.length >= 1).toBe(true)
	expect(actualShort.length <= 2).toBe(true)

	const actualMedium = value.richText({
		seed: task.name,
		pattern: "medium",
		model: customModel,
	})
	expect(actualMedium.length >= 2).toBe(true)
	expect(actualMedium.length <= 4).toBe(true)

	const actualLong = value.richText({
		seed: task.name,
		pattern: "long",
		model: customModel,
	})
	expect(actualLong.length >= 4).toBe(true)
	expect(actualLong.length <= 8).toBe(true)
})
