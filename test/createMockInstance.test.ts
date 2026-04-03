import { it, expect } from "vitest"

import { createMockFactory, MockFactory } from "../src"

it("creates a mock instance", ({ task }) => {
	const mock = createMockFactory({ seed: task.name })

	expect(mock instanceof MockFactory).toBe(true)
})

it("supports number seed", () => {
	const mock = createMockFactory({ seed: 1 })

	expect(mock instanceof MockFactory).toBe(true)
})
