import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test(
	"creates a mock CustomType field value",
	snapshotTwiceMacro,
	value.customType,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.customType({ seed: 1 }),
);

test("supports custom model", (t) => {
	const customModel = model.customType({
		withUID: true,
		tabsCount: 1,
		withSliceZones: true,
		withSharedSlices: true,
	});

	const actual = value.customType({ model: customModel });

	t.is(typeof actual.uid, "string");
});

test.only("supports custom field configs", (t) => {
	const linkableDocuments = [value.document()];
	const customModel = model.customType({
		tabsCount: 1,
		configs: {
			boolean: { count: 0 },
			color: { count: 0 },
			contentRelationship: { count: 1 },
			date: { count: 0 },
			embed: { count: 0 },
			geoPoint: { count: 0 },
			image: { count: 0 },
			integrationFields: { count: 0 },
			keyText: { count: 0 },
			link: { count: 0 },
			linkToMedia: { count: 0 },
			number: { count: 0 },
			richText: { count: 0 },
			select: { count: 0 },
			timestamp: { count: 0 },
			title: { count: 0 },
		},
	});

	const actual = value.customType({
		model: customModel,
		configs: {
			contentRelationship: {
				linkableDocuments,
			},
		},
	});

	const fieldKey = Object.keys(actual.data)[0];

	// @ts-expect-error - Untyped data field
	t.is(actual.data?.[fieldKey]?.id, linkableDocuments[0].id);
});
