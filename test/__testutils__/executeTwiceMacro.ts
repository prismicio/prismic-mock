import { expect } from "vitest"

export const executeTwice = <MockReturnType>(
	mockFn: () => MockReturnType,
	expected: [MockReturnType, MockReturnType],
): void => {
	const actual = [mockFn(), mockFn()]

	expect(actual).toEqual(expected)
}
