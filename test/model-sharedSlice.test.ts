import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Shared Slice model",
	snapshotTwiceMacro,
	model.sharedSlice,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	model.sharedSlice({ seed: 1 }),
);

test("can be configured with a specific number of variations", (t) => {
	const actual = model.sharedSlice({ variationsCount: 10 });

	t.is(actual.variations.length, 10);
});

test("can be configured with specific repeat and non-repeat field configuration", (t) => {
	const actual = model.sharedSlice({
		variationsCount: 1,
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

	const variation = actual.variations[0];

	const itemsFieldIds = Object.keys(variation.items);
	const primaryFieldIds = Object.keys(variation.primary);

	t.is(itemsFieldIds.length, 1);
	t.is(variation.items[itemsFieldIds[0]].type, "Boolean");

	t.is(primaryFieldIds.length, 1);
	t.is(variation.primary[primaryFieldIds[0]].type, "Boolean");
});
