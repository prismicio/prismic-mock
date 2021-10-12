import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Slice Zone field value", snapshotTwiceMacro, () =>
	value.sliceZone(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	value.sliceZone({ seed: t.title }),
);

test("can be customized with a pattern to determine the number of Slices", (t) => {
	const customModel = model.sliceZone({
		seed: t.title,
		choices: {
			foo: model.slice({ seed: t.title }),
		},
	});

	const actualShort = value.sliceZone({
		seed: t.title,
		pattern: "short",
		model: customModel,
	});
	t.true(actualShort.length >= 1);
	t.true(actualShort.length <= 3);

	const actualMedium = value.sliceZone({
		seed: t.title,
		pattern: "medium",
		model: customModel,
	});
	t.true(actualMedium.length >= 3);
	t.true(actualMedium.length <= 6);

	const actualLong = value.sliceZone({
		seed: t.title,
		pattern: "long",
		model: customModel,
	});
	t.true(actualLong.length >= 6);
	t.true(actualLong.length <= 12);
});

test("can be provided with a list of Shared Slice models for Slice Zones containing Shared Slices", (t) => {
	const customModel = model.sliceZone({
		seed: t.title,
		choices: {
			foo: model.sharedSliceChoice(),
		},
	});

	const sharedSliceModel = model.sharedSlice({
		seed: t.title,
		id: "foo",
		variations: [model.sharedSliceVariation({ seed: t.title })],
	});

	const actual = value.sliceZone({
		model: customModel,
		sharedSliceModels: [sharedSliceModel],
	});

	t.true(actual.every((slice) => slice.slice_type === sharedSliceModel.id));
});

test("Shared Slices not provided are omitted from the return value", (t) => {
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
		model: customModel,
		sharedSliceModels: [sharedSliceModel],
	});

	t.true(actual.every((slice) => slice.slice_type === sharedSliceModel.id));
});
