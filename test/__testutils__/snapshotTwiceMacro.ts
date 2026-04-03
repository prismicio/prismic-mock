import { expect } from "vitest"

export const snapshotTwice = <MockReturnType>(
	mockFn: (testName: string) => MockReturnType,
	testName: string,
): void => {
	expect([mockFn(testName), mockFn(testName)]).toMatchSnapshot()
}
