import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Slice Zone field value", snapshotTwiceMacro, (t) =>
	value.sliceZone({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	value.sliceZone({ seed: 1 }),
);

test("can be customized with a specific number of Slices", (t) => {
	const customModel = model.sliceZone({
		seed: t.title,
		choices: {
			foo: model.slice({ seed: t.title }),
		},
	});

	const actual = value.sliceZone({
		seed: t.title,
		model: customModel,
		itemsCount: 5,
	});
	t.is(actual.length, 5);
});

test("can be provided with a list of Shared Slice models for Slice Zones containing Shared Slices", (t) => {
	const seed = t.title;

	const customModel = model.sliceZone({
		seed,
		choices: {
			foo: model.sharedSliceChoice(),
		},
	});

	const sharedSliceModel = model.sharedSlice({
		seed,
		id: "foo",
		variations: [model.sharedSliceVariation({ seed: t.title })],
	});

	const actual = value.sliceZone({
		seed,
		model: customModel,
		sharedSliceModels: [sharedSliceModel],
	});

	t.true(actual.every((slice) => slice.slice_type === sharedSliceModel.id));
});

test("Shared Slices not provided are omitted from the return value", (t) => {
	const seed = t.title;

	const customModel = model.sliceZone({
		seed: t.title,
		choices: {
			foo: model.sharedSliceChoice(),
			bar: model.sharedSliceChoice(),
		},
	});
	const sharedSliceModel = model.sharedSlice({
		seed: t.title,
		id: "foo",
		variations: [model.sharedSliceVariation({ seed: t.title })],
	});

	const actual = value.sliceZone({
		seed,
		model: customModel,
		sharedSliceModels: [sharedSliceModel],
	});

	t.true(actual.every((slice) => slice.slice_type === sharedSliceModel.id));
});
