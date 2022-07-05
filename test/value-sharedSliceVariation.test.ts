import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test(
	"creates a mock Shared Slice Variation field value",
	snapshotTwiceMacro,
	(t) => value.sharedSliceVariation({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	value.sharedSliceVariation({ seed: 1 }),
);

test("supports custom model", (t) => {
	const customModel = model.sharedSliceVariation({
		seed: t.title,
		primaryFields: {
			boolean: model.boolean({ seed: t.title }),
		},
		itemsFields: {
			keyText: model.keyText({ seed: t.title }),
		},
	});

	const actual = value.sharedSliceVariation({
		seed: t.title,
		model: customModel,
	});

	t.is(typeof actual.primary.boolean, "boolean");

	for (const item of actual.items) {
		t.is(typeof item.keyText, "string");
	}
});

test("returns no items if model does not include items model", (t) => {
	const customModel = model.sharedSliceVariation({ seed: t.title });

	const actual = value.sharedSliceVariation({
		seed: t.title,
		model: customModel,
	});

	t.is(actual.items.length, 0);
});

test("can be customized with a specific number of items", (t) => {
	const customModel = model.sharedSliceVariation({
		seed: t.title,
		itemsFields: {
			boolean: model.boolean({ seed: t.title }),
		},
	});

	const actualNone = value.sharedSliceVariation({
		seed: t.title,
		model: customModel,
		itemsCount: 5,
	});
	t.is(actualNone.items.length, 5);
});

test("can be customized to return a specific type", (t) => {
	const actual = value.sharedSliceVariation({
		seed: t.title,
		type: "type",
	});

	t.is(actual.slice_type, "type");
});

test("slice_label is null", (t) => {
	const actual = value.sharedSliceVariation({
		seed: t.title,
	});

	t.is(actual.slice_label, null);
});
