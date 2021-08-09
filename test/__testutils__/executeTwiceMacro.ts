import * as ava from "ava";

export const executeTwiceMacro = <MockReturnType>(
	t: ava.ExecutionContext,
	mockFn: () => MockReturnType,
	expected: [MockReturnType, MockReturnType],
): void => {
	const actual = [mockFn(), mockFn()];

	t.deepEqual(actual, expected);
};
