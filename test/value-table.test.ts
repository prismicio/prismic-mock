import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Table field value", snapshotTwiceMacro, (t) =>
	value.table({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	value.table({ seed: 1 }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.table({
		seed: t.title,
		state: "empty",
	});

	t.is(actual, null);
});

test("provides a non empty Table head and body with rich text content", (t) => {
	const actual = value.table({ seed: t.title });

	t.is(actual.head?.rows.length, 1);
	t.is(actual.head?.rows[0].cells.length, 3);
	actual.head?.rows[0].cells.forEach((cell) => {
		t.is(cell.type, "header");
		t.truthy(cell.content.length);
	});
	t.is(actual.body.rows.length, 3);
	actual.body.rows.forEach((row) => {
		t.is(row.cells.length, 3);
		row.cells.forEach((cell) => {
			t.is(cell.type, "data");
			t.truthy(cell.content.length);
		});
	});
});
