import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test(
	"creates a mock Slice Zone field value",
	snapshotTwiceMacro,
	value.sliceZone,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.sliceZone({ seed: 1 }),
);

test("can be customized with a pattern to determine the number of Slices", (t) => {
	const actualShort = value.sliceZone({ pattern: "short" });
	t.true(actualShort.length >= 1);
	t.true(actualShort.length <= 3);

	const actualMedium = value.sliceZone({ pattern: "medium" });
	t.true(actualMedium.length >= 3);
	t.true(actualMedium.length <= 6);

	const actualLong = value.sliceZone({ pattern: "long" });
	t.true(actualLong.length >= 6);
	t.true(actualLong.length <= 12);
});

test("can be provided with a list of Shared Slice models for Slice Zones containing Shared Slices", (t) => {
	const customModel = model.sliceZone({ withSharedSlices: true });
	const sharedSliceModel = model.sharedSlice();

	customModel.config.choices = {
		[sharedSliceModel.id]: model.sharedSliceChoice(),
	};

	const actual = value.sliceZone({
		model: customModel,
		sharedSliceModels: [sharedSliceModel],
	});

	t.true(actual.every((slice) => slice.slice_type === sharedSliceModel.id));
});

test("Shared Slices not provided are omitted from the return value", (t) => {
	const customModel = model.sliceZone({ withSharedSlices: true });
	const sharedSliceModel1 = model.sharedSlice();
	const sharedSliceModel2 = model.sharedSlice();

	customModel.config.choices = {
		[sharedSliceModel1.id]: model.sharedSliceChoice(),
		[sharedSliceModel2.id]: model.sharedSliceChoice(),
	};

	const actual = value.sliceZone({ model: customModel });

	t.true(actual.every((slice) => slice.slice_type === sharedSliceModel1.id));
});
