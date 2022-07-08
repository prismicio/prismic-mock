import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Timestamp field value", snapshotTwiceMacro, (t) =>
	value.timestamp({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	value.timestamp({ seed: 1 }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.timestamp({
		seed: t.title,
		state: "empty",
	});

	t.is(actual, null);
});

test("can be configured to return a timestamp after and before given timestamps", (t) => {
	const after = new Date(1984, 0, 1);
	const before = new Date(1984, 0, 3);

	const actual = value.timestamp({
		seed: t.title,
		after,
		before,
	});
	const actualTime = new Date(actual).getTime();

	t.true(before.getTime() > actualTime);
	t.true(after.getTime() < actualTime);
});
