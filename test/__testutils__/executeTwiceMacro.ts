import * as ava from "ava";
import * as util from "util";

export const executeTwiceMacro = <MockReturnType>(
	t: ava.ExecutionContext,
	mockFn: () => MockReturnType,
	expected: [MockReturnType, MockReturnType],
): void => {
	const actual = [mockFn(), mockFn()];

	t.log(util.inspect(actual, { colors: true, depth: null }));

	t.deepEqual(actual, expected);
};
