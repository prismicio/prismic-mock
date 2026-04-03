import * as prismic from "@prismicio/client"
import { it, expect } from "vitest"

import * as model from "../src/model"
import * as value from "../src/value"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Link field value", ({ task }) => {
	snapshotTwice((name) => value.link({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.link({ seed: 1 }), task.name)
})

it("supports custom model", ({ task }) => {
	const customModelBase = model.link({ seed: task.name })
	const customModel = {
		...customModelBase,
		config: {
			...customModelBase.config,
			allowTargetBlank: true as const,
			allowText: true as const,
		},
	}

	const actual = value.link({
		// This specific seed ensures `target` will be "_blank".
		seed: 10000,
		model: customModel,
		type: prismic.LinkType.Web,
	})

	expect(actual.target).toBe("_blank")
	expect(typeof actual.text).toBe("string")
})

it("can be configured to return an empty link value", ({ task }) => {
	const actual = value.link({
		seed: task.name,
		type: prismic.LinkType.Web,
		state: "empty",
	})

	expect("url" in actual).toBe(false)
})

it("can be configured to return a value with `_blank` target", ({ task }) => {
	const actualTrue = value.link({
		seed: task.name,
		type: prismic.LinkType.Web,
		withTargetBlank: true,
	})
	expect(actualTrue.target).toBe("_blank")

	const actualFalse = value.link({
		seed: task.name,
		type: prismic.LinkType.Web,
		withTargetBlank: false,
	})
	expect(actualFalse.target).toBe(undefined)
})

it("can be configured to return a value with display text", ({ task }) => {
	const actualTrue = value.link({
		seed: task.name,
		type: prismic.LinkType.Web,
		withText: true,
	})
	expect(typeof actualTrue.text).toBe("string")

	const actualFalse = value.link({
		seed: task.name,
		type: prismic.LinkType.Web,
		withText: false,
	})
	expect(actualFalse.text).toBe(undefined)
})
