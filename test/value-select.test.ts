import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Select field value", snapshotTwiceMacro, (t) =>
	value.select({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	value.select({ seed: 1 }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.select({
		seed: t.title,
		state: "empty",
	});

	t.is(actual, null);
});

test("supports custom model", (t) => {
	const seed = t.title;

	const customModel = model.select({
		seed,
		options: ["foo", "bar"],
	});

	const actual = value.select({ seed, model: customModel });

	t.true(customModel.config.options.includes(actual));
});
