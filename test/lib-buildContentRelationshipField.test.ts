import { it, expect } from "vitest"

import { value, model } from "../src"
import { buildContentRelationshipField } from "../src/lib/buildContentRelationshipField"

it("returns undefined uid if document.uid is null", ({ task }) => {
	const document = value.document({
		seed: task.name,
		model: model.customType({ seed: task.name }),
	})

	const actual = buildContentRelationshipField({ document })

	expect(document.uid).toBe(null)
	expect(actual.uid).toBe(undefined)
})

it("returns undefined url if document.url is null", ({ task }) => {
	const document = value.document({ seed: task.name })
	document.url = null

	const actual = buildContentRelationshipField({ document })

	expect(actual.url).toBe(undefined)
})
