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

test("can be customized with a specific number of items", (t) => {
	const actual = value.group({
		seed: t.title,
		itemsCount: 5,
	});

	t.is(actual.length, 5);
});
