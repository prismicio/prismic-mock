import { it, expect } from "vitest"

import * as model from "../src/model"
import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Title field value", ({ task }) => {
	snapshotTwice((name) => value.title({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.title({ seed: 1 }), task.name)
})

it("supports custom model", ({ task }) => {
	const customModelBase = model.title({ seed: task.name })
	const customModel = {
		...customModelBase,
		config: {
			...customModelBase.config,
			single: "heading3" as const,
		},
	}

	const actual = value.title({
		seed: task.name,
		model: customModel,
	})

	expect(actual[0].type).toBe(customModel.config.single)
})

it("can be customized with a pattern to determine title length", ({ task }) => {
	const actualShort = value.title({
		seed: task.name,
		pattern: "short",
	})
	const actualShortWordCount = actualShort[0].text.split(" ").length
	expect(actualShortWordCount >= 1).toBe(true)
	expect(actualShortWordCount <= 3).toBe(true)

	const actualMedium = value.title({
		seed: task.name,
		pattern: "medium",
	})
	const actualMediumWordCount = actualMedium[0].text.split(" ").length
	expect(actualMediumWordCount >= 3).toBe(true)
	expect(actualMediumWordCount <= 6).toBe(true)

	const actualLong = value.title({
		seed: task.name,
		pattern: "long",
	})
	const actualLongWordCount = actualLong[0].text.split(" ").length
	expect(actualLongWordCount >= 6).toBe(true)
	expect(actualLongWordCount <= 12).toBe(true)
})
