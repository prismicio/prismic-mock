import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test(
	"creates a mock Shared Slice Variation field value",
	snapshotTwiceMacro,
	() => value.sharedSliceVariation(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	value.sharedSliceVariation({ seed: t.title }),
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

test("can be customized with a pattern to determine the number of items", (t) => {
	const customModel = model.sharedSliceVariation({
		seed: t.title,
		itemsFields: {
			boolean: model.boolean({ seed: t.title }),
		},
	});

	const actualNone = value.sharedSliceVariation({
		seed: t.title,
		pattern: "none",
		model: customModel,
	});
	t.true(actualNone.items.length < 1);

	const actualShort = value.sharedSliceVariation({
		seed: t.title,
		pattern: "short",
		model: customModel,
	});
	t.true(actualShort.items.length >= 1);
	t.true(actualShort.items.length <= 3);

	const actualMedium = value.sharedSliceVariation({
		seed: t.title,
		pattern: "medium",
		model: customModel,
	});
	t.true(actualMedium.items.length >= 3);
	t.true(actualMedium.items.length <= 6);

	const actualLong = value.sharedSliceVariation({
		seed: t.title,
		pattern: "long",
		model: customModel,
	});
	t.true(actualLong.items.length >= 6);
	t.true(actualLong.items.length <= 12);
});

test("can be customized to return a specific type", (t) => {
	const actual = value.sharedSliceVariation({
		seed: t.title,
		type: "type",
	});

	t.is(actual.slice_type, "type");
});

test("can be customized to return a specific label", (t) => {
	const actual = value.sharedSliceVariation({
		seed: t.title,
		label: "label",
	});

	t.is(actual.slice_label, "label");
});
