import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Shared Slice field value", snapshotTwiceMacro, () =>
	value.sharedSlice(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	value.sharedSlice({ seed: t.title }),
);

test("supports custom model", (t) => {
	const customModel = model.sharedSlice({
		seed: t.title,
		variations: [
			model.sharedSliceVariation({
				seed: t.title,
				primaryFields: {
					boolean: model.boolean({ seed: t.title }),
				},
				itemsFields: {
					boolean: model.boolean({ seed: t.title }),
				},
			}),
		],
	});

	const actual = value.sharedSlice({
		seed: t.title,
		model: customModel,
	});

	t.true(
		Object.values(actual.primary).every((field) => typeof field === "boolean"),
	);

	t.true(
		actual.items.every((item) =>
			Object.values(item).every((field) => typeof field === "boolean"),
		),
	);
});

test("returns no items if model does not include items model", (t) => {
	const customModel = model.sharedSlice({
		seed: t.title,
		variations: [model.sharedSliceVariation({ seed: t.title })],
	});

	const actual = value.sharedSlice({ model: customModel });

	t.is(actual.items.length, 0);
});

test("can be customized with a pattern to determine the number of items", (t) => {
	const customModel = model.sharedSlice({
		seed: t.title,
		variations: [
			model.sharedSliceVariation({
				seed: t.title,
				itemsFields: {
					boolean: model.boolean({ seed: t.title }),
				},
			}),
		],
	});

	const actualNone = value.sharedSlice({
		seed: t.title,
		model: customModel,
		pattern: "none",
	});
	t.true(actualNone.items.length < 1);

	const actualShort = value.sharedSlice({
		seed: t.title,
		model: customModel,
		pattern: "short",
	});
	t.true(actualShort.items.length >= 1);
	t.true(actualShort.items.length <= 3);

	const actualMedium = value.sharedSlice({
		seed: t.title,
		model: customModel,
		pattern: "medium",
	});
	t.true(actualMedium.items.length >= 3);
	t.true(actualMedium.items.length <= 6);

	const actualLong = value.sharedSlice({
		seed: t.title,
		model: customModel,
		pattern: "long",
	});
	t.true(actualLong.items.length >= 6);
	t.true(actualLong.items.length <= 12);
});
