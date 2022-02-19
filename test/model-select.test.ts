import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Select field model", snapshotTwiceMacro, () =>
	model.select(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	model.select({ seed: t.title }),
);

test("can be configured for a specific options", (t) => {
	const options = ["foo", "bar"];
	const actual = model.select({
		seed: t.title,
		options,
	});

	t.is(actual.config.options, options);
});

test("can be configured for a specific default value", (t) => {
	const actual = model.select({
		seed: t.title,
		options: ["foo", "bar"],
		defaultValue: "foo",
	});

	t.is(actual.config.default_value, "foo");
});
