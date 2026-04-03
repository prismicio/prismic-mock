import { it, expect } from "vitest"

import * as prismicM from "../src"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock CustomType field value", ({ task }) => {
	snapshotTwice((name) => prismicM.value.customType({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => prismicM.value.customType({ seed: 1 }), task.name)
})

it("supports custom model", ({ task }) => {
	const customModel = prismicM.model.customType({
		seed: task.name,
		fields: {
			uid: prismicM.model.uid({ seed: task.name }),
			boolean: prismicM.model.boolean({ seed: task.name }),
		},
	})

	const actual = prismicM.value.customType({
		seed: task.name,
		model: customModel,
	})

	expect(typeof actual.uid).toBe("string")
	expect(typeof actual.data.boolean).toBe("boolean")
})

it("uid field is not included in data field", ({ task }) => {
	const customModel = prismicM.model.customType({
		seed: task.name,
		fields: {
			uid: prismicM.model.uid({ seed: task.name }),
		},
	})

	const actual = prismicM.value.customType({
		seed: task.name,
		model: customModel,
	})

	expect(typeof actual.uid).toBe("string")
	expect("uid" in actual.data).toBe(false)
})

it("uid field is null if not UID field is not in model", ({ task }) => {
	const customModel = prismicM.model.customType({
		seed: task.name,
		fields: {
			boolean: prismicM.model.boolean({ seed: task.name }),
		},
	})

	const actual = prismicM.value.customType({
		seed: task.name,
		model: customModel,
	})

	expect(actual.uid).toBe(null)
	expect("uid" in actual.data).toBe(false)
})

it("can be configured to return value with alternative languages", ({ task }) => {
	const seed = task.name

	const customModel = prismicM.model.customType({ seed })

	const alternateLanguages = [
		prismicM.value.customType({
			seed,
			model: customModel,
		}),
		prismicM.value.customType({
			seed,
			model: customModel,
		}),
	]

	const actual = prismicM.value.customType({
		seed,
		model: customModel,
		alternateLanguages,
	})

	expect(actual.alternate_languages.map((item) => item.id)).toEqual(
		alternateLanguages.map((alternateLanguage) => alternateLanguage.id),
	)
})

it("can be configured to explicitly return value with a URL", ({ task }) => {
	const actualTrue = prismicM.value.customType({
		seed: task.name,
		withURL: true,
	})
	expect(typeof actualTrue.url).toBe("string")

	const actualFalse = prismicM.value.customType({
		seed: task.name,
		withURL: false,
	})
	expect(actualFalse.url).toBe(null)
})
