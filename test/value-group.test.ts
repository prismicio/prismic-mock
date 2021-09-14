import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Group field value", snapshotTwiceMacro, value.group);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.group({ seed: 1 }),
);

test("supports custom model", (t) => {
	const customModel = model.group({
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

	const actual = value.group({ model: customModel });

	t.true(
		actual.every((item) =>
			Object.values(item).every((item2) => typeof item2 === "boolean"),
		),
	);
});

test("can be customized with a pattern to determine the number of items", (t) => {
	const actualShort = value.group({ pattern: "short" });
	t.true(actualShort.length >= 1);
	t.true(actualShort.length <= 3);

	const actualMedium = value.group({ pattern: "medium" });
	t.true(actualMedium.length >= 3);
	t.true(actualMedium.length <= 6);

	const actualLong = value.group({ pattern: "long" });
	t.true(actualLong.length >= 6);
	t.true(actualLong.length <= 12);
});
