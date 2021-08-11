import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Slice field model", snapshotTwiceMacro, model.slice);

test("supports custom seed", snapshotTwiceMacro, () =>
	model.slice({ seed: 1 }),
);

test("supports custom seed for repeat field", snapshotTwiceMacro, () =>
	model.slice({
		seed: 1,
		repeatFieldConfig: {
			seed: 2,
		},
	}),
);

test("supports custom seed for non-repeat field", snapshotTwiceMacro, () =>
	model.slice({
		seed: 1,
		nonRepeatFieldConfig: {
			seed: 2,
		},
	}),
);

test("can be configured with specific repeat and non-repeat field configuration", (t) => {
	const actual = model.slice({
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
	});

	const repeatFieldIds = Object.keys(actual.repeat);
	const nonRepeatFieldIds = Object.keys(actual["non-repeat"]);

	t.is(repeatFieldIds.length, 1);
	t.is(actual.repeat[repeatFieldIds[0]].type, "Boolean");

	t.is(nonRepeatFieldIds.length, 1);
	t.is(actual["non-repeat"][nonRepeatFieldIds[0]].type, "Boolean");
});
