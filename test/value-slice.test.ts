import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Slice field value", snapshotTwiceMacro, value.slice);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.slice({ seed: 1 }),
);

test("supports custom model", (t) => {
	const customModel = model.slice({
		nonRepeatFieldConfig: {
			configs: {
				boolean: { count: 1 },
				color: { count: 0 },
				contentRelationship: { count: 0 },
				date: { count: 0 },
				embed: { count: 0 },
				geoPoint: { count: 0 },
				image: { count: 0 },
				keyText: { count: 0 },
				link: { count: 0 },
				linkToMedia: { count: 0 },
				number: { count: 0 },
				richText: { count: 0 },
				select: { count: 0 },
				timestamp: { count: 0 },
				title: { count: 0 },
			},
		},
		repeatFieldConfig: {
			configs: {
				boolean: { count: 1 },
				color: { count: 0 },
				contentRelationship: { count: 0 },
				date: { count: 0 },
				embed: { count: 0 },
				geoPoint: { count: 0 },
				image: { count: 0 },
				keyText: { count: 0 },
				link: { count: 0 },
				linkToMedia: { count: 0 },
				number: { count: 0 },
				richText: { count: 0 },
				select: { count: 0 },
				timestamp: { count: 0 },
				title: { count: 0 },
			},
		},
	});

	const actual = value.slice({ model: customModel });

	t.true(
		Object.values(actual.primary).every((field) => typeof field === "boolean"),
	);

	t.true(
		actual.items.every((item) =>
			Object.values(item).every((field) => typeof field === "boolean"),
		),
	);
});

test("returns no items if model does not include repeat model", (t) => {
	const customModel = model.slice();
	customModel.repeat = {};

	const actual = value.slice({ model: customModel });

	t.is(actual.items.length, 0);
});

test("can be customized with a pattern to determine the number of items", (t) => {
	const actualNone = value.slice({ pattern: "none" });
	t.true(actualNone.items.length < 1);

	const actualShort = value.slice({ pattern: "short" });
	t.true(actualShort.items.length >= 1);
	t.true(actualShort.items.length <= 3);

	const actualMedium = value.slice({ pattern: "medium" });
	t.true(actualMedium.items.length >= 3);
	t.true(actualMedium.items.length <= 6);

	const actualLong = value.slice({ pattern: "long" });
	t.true(actualLong.items.length >= 6);
	t.true(actualLong.items.length <= 12);
});
