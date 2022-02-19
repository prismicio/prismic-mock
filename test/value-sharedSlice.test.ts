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

test("can be customized with a specific number of items", (t) => {
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

	const actual = value.sharedSlice({
		seed: t.title,
		model: customModel,
		itemsCount: 5,
	});
	t.is(actual.items.length, 5);
});
