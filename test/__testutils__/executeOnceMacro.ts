import { expect } from "vitest"

export const executeOnce = <MockReturnType>(
	mockFn: () => MockReturnType,
	expected: [MockReturnType],
): void => {
	const actual = mockFn()

	expect([actual]).toEqual(expected)
}
