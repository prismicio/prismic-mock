import * as ava from "ava";

export const executeOnceMacro = <MockReturnType>(
	t: ava.ExecutionContext,
	mockFn: () => MockReturnType,
	expected: [MockReturnType],
): void => {
	const actual = mockFn();

	t.deepEqual([actual], expected);
};
