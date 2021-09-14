import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Group field model", snapshotTwiceMacro, model.group);

test("supports custom seed", snapshotTwiceMacro, () =>
	model.group({ seed: 1 }),
);

test("can be configured for specific number of field types", (t) => {
	const actual = model.group({
		configs: {
			boolean: { count: 1 },
			color: { count: 0 },
			contentRelationship: { count: 0 },
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

	const fieldIds = Object.keys(actual.config.fields);

	t.is(fieldIds.length, 1);
	t.is(actual.config.fields[fieldIds[0]].type, "Boolean");
});

test("can be configured for specific field type configurations", (t) => {
	const actual = model.group({
		configs: {
			boolean: { count: 0 },
			color: { count: 0 },
			contentRelationship: { count: 0 },
			date: { count: 0 },
			embed: { count: 0 },
			geoPoint: { count: 0 },
			image: {
				count: 1,
				config: {
					withConstraint: true,
					thumbnailsCount: 0,
				},
			},
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

	const fieldIds = Object.keys(actual.config.fields);

	t.is(fieldIds.length, 1);
	t.is(actual.config.fields[fieldIds[0]].type, "Image");

	t.deepEqual(actual.config.fields[fieldIds[0]].config, {
		constraint: {
			height: 1983,
			width: 1854,
		},
		label: "Roi",
		thumbnails: [],
	});
});
