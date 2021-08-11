import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Shared Slice variation field model",
	snapshotTwiceMacro,
	model.sharedSliceVariation,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	model.sharedSliceVariation({ seed: 1 }),
);

test("supports custom seed for primary field", snapshotTwiceMacro, () =>
	model.sharedSliceVariation({
		seed: 1,
		primaryFieldConfig: {
			seed: 2,
		},
	}),
);

test("supports custom seed for items field", snapshotTwiceMacro, () =>
	model.sharedSliceVariation({
		seed: 1,
		itemsFieldConfig: {
			seed: 2,
		},
	}),
);

test("can be configured with specific repeat and non-repeat field configuration", (t) => {
	const actual = model.sharedSliceVariation({
		itemsFieldConfig: {
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
		primaryFieldConfig: {
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

	const itemsFieldIds = Object.keys(actual.items);
	const primaryFieldIds = Object.keys(actual.primary);

	t.is(itemsFieldIds.length, 1);
	t.is(actual.items[itemsFieldIds[0]].type, "Boolean");

	t.is(primaryFieldIds.length, 1);
	t.is(actual.primary[primaryFieldIds[0]].type, "Boolean");
});
