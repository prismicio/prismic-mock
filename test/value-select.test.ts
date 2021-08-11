import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Select field value", snapshotTwiceMacro, value.select);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.select({ seed: 1 }),
);

test("supports custom model", (t) => {
	const customModel = model.select({ withDefaultValue: true });

	const actual = value.select({ model: customModel });

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	t.true(customModel.config.options.includes(actual!));
});
