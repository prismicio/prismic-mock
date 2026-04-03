import { it, expect } from "vitest"

import * as value from "../src/value"

it("document is an alias for custom type", () => {
	expect(value.document).toBe(value.customType)
})
