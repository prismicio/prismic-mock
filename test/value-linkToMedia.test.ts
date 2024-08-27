import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Link To Media field value", snapshotTwiceMacro, (t) =>
	value.linkToMedia({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	value.linkToMedia({ seed: 1 }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.linkToMedia({
		seed: t.title,
		state: "empty",
	});

	t.false("url" in actual);
});

test("can be configured to return a value with display text", (t) => {
	const actualTrue = value.linkToMedia({
		seed: t.title,
		withText: true,
	});
	t.is(typeof actualTrue.text, "string");

	const actualFalse = value.linkToMedia({
		seed: t.title,
		withText: false,
	});
	t.is(actualFalse.text, undefined);
});
