import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Slice field value", snapshotTwiceMacro, () =>
	value.slice(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	value.slice({ seed: t.title }),
);

test("supports custom model", (t) => {
	const customModel = model.slice({
		seed: t.title,
		nonRepeatFields: {
			boolean: model.boolean({ seed: t.title }),
		},
		repeatFields: {
			keyText: model.keyText({ seed: t.title }),
		},
	});

	const actual = value.slice({
		seed: t.title,
		model: customModel,
	});

	t.is(typeof actual.primary.boolean, "boolean");

	for (const item of actual.items) {
		t.is(typeof item.keyText, "string");
	}
});

test("returns no items if model does not include repeat model", (t) => {
	const customModel = model.slice({ seed: t.title });

	const actual = value.slice({
		seed: t.title,
		model: customModel,
	});

	t.is(actual.items.length, 0);
});

test("can be customized with a pattern to determine the number of items", (t) => {
	const customModel = model.slice({
		seed: t.title,
		repeatFields: {
			boolean: model.boolean({ seed: t.title }),
		},
	});

	const actualNone = value.slice({
		seed: t.title,
		model: customModel,
		pattern: "none",
	});
	t.true(actualNone.items.length < 1);

	const actualShort = value.slice({
		seed: t.title,
		model: customModel,
		pattern: "short",
	});
	t.true(actualShort.items.length >= 1);
	t.true(actualShort.items.length <= 3);

	const actualMedium = value.slice({
		seed: t.title,
		model: customModel,
		pattern: "medium",
	});
	t.true(actualMedium.items.length >= 3);
	t.true(actualMedium.items.length <= 6);

	const actualLong = value.slice({
		seed: t.title,
		model: customModel,
		pattern: "long",
	});
	t.true(actualLong.items.length >= 6);
	t.true(actualLong.items.length <= 12);
});

test("can be customized to return a specific type", (t) => {
	const actual = value.slice({
		seed: t.title,
		type: "type",
	});

	t.is(actual.slice_type, "type");
});

test("can be customized to return a specific label", (t) => {
	const actual = value.slice({
		seed: t.title,
		label: "label",
	});

	t.is(actual.slice_label, "label");
});
