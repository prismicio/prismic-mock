import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Select field value", snapshotTwiceMacro, () =>
	value.select(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	value.select({ seed: t.title }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.select({
		seed: t.title,
		state: "empty",
	});

	t.is(actual, null);
});

test("supports custom model", (t) => {
	const customModel = model.select({
		seed: t.title,
		withDefaultValue: true,
	});

	const actual = value.select({ model: customModel });

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	t.true(customModel.config.options.includes(actual!));
});
