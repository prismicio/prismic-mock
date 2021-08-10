import * as ava from "ava";

export const snapshotTwiceMacro = <MockReturnType>(
	t: ava.ExecutionContext,
	mockFn: () => MockReturnType,
): void => {
	t.snapshot([mockFn(), mockFn()]);
};
