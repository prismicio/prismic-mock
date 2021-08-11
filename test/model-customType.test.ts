import test from "ava";
import * as prismicT from "@prismicio/types";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Custom Type field model",
	snapshotTwiceMacro,
	model.customType,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	model.customType({ seed: 1 }),
);

test("can be configured to with a specific number of tabs", (t) => {
	const actual = model.customType({ tabsCount: 10 });

	t.is(Object.keys(actual.json).length, 10);
});

test("can be configured to include a UID field in the first tab", (t) => {
	const actual = model.customType({ withUID: true, tabsCount: 2 });

	const tabIds = Object.keys(actual.json);

	t.true(
		Object.values(actual.json[tabIds[0]]).some(
			(fieldModel) => fieldModel.type === "UID",
		),
	);

	t.false(
		Object.values(actual.json[tabIds[1]]).some(
			(fieldModel) => fieldModel.type === "UID",
		),
	);
});

test("does not include Slice Zones by default", (t) => {
	const actual = model.customType();

	t.plan(Object.keys(actual.json).length);

	Object.values(actual.json).forEach((tabModel) => {
		t.false(
			Object.values(tabModel).some(
				(fieldModel) => fieldModel.type === "Slices",
			),
		);
	});
});

test("can be configured to include a Slice Zone in each tab", (t) => {
	const actual = model.customType({ withSliceZones: true });

	t.plan(Object.keys(actual.json).length);

	Object.values(actual.json).forEach((tabModel) => {
		t.is(
			Object.values(tabModel).filter(
				(fieldModel) => fieldModel.type === "Slices",
			).length,
			1,
		);
	});
});

test("can be configured to include a Slice Zone with Shared Slices in each tab", (t) => {
	const actual = model.customType({
		withSliceZones: true,
		withSharedSlices: true,
	});

	t.plan(Object.keys(actual.json).length * 2);

	Object.values(actual.json).forEach((tabModel) => {
		t.is(
			Object.values(tabModel).filter(
				(fieldModel) => fieldModel.type === "Slices",
			).length,
			1,
		);

		const sliceZoneModel = Object.values(tabModel).find(
			(fieldModel): fieldModel is prismicT.CustomTypeModelSliceZoneField =>
				fieldModel.type === "Slices",
		);

		if (sliceZoneModel) {
			t.true(
				Object.values(sliceZoneModel.config.choices).every(
					(choiceModel) => choiceModel.type === "SharedSlice",
				),
			);
		} else {
			t.fail("Tab did not include a Slice Zone");
		}
	});
});
