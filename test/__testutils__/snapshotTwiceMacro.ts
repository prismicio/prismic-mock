import * as ava from "ava";

export const snapshotTwiceMacro = <MockReturnType>(
	t: ava.ExecutionContext,
	mockFn: (t: ava.ExecutionContext) => MockReturnType,
): void => {
	t.snapshot([mockFn(t), mockFn(t)]);
};
