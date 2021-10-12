import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Group field value", snapshotTwiceMacro, () =>
	value.group(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	value.group({ seed: t.title }),
);

test("supports custom model", (t) => {
	const customModel = model.group({
		seed: t.title,
		fields: {
			boolean: model.boolean({ seed: t.title }),
		},
	});

	const actual = value.group({
		seed: t.title,
		model: customModel,
	});

	t.plan(actual.length);
	for (const item of actual) {
		t.is(typeof item.boolean, "boolean");
	}
});

test("can be customized with a pattern to determine the number of items", (t) => {
	const actualShort = value.group({
		seed: t.title,
		pattern: "short",
	});
	t.true(actualShort.length >= 1);
	t.true(actualShort.length <= 3);

	const actualMedium = value.group({
		seed: t.title,
		pattern: "medium",
	});
	t.true(actualMedium.length >= 3);
	t.true(actualMedium.length <= 6);

	const actualLong = value.group({
		seed: t.title,
		pattern: "long",
	});
	t.true(actualLong.length >= 6);
	t.true(actualLong.length <= 12);
});
