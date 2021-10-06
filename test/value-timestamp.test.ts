import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test(
	"creates a mock Timestamp field value",
	snapshotTwiceMacro,
	value.timestamp,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.timestamp({ seed: 1 }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.timestamp({ isEmpty: true });

	t.is(actual, null);
});

test("can be configured to return a timestamp after and before given timestamps", (t) => {
	const after = new Date(1984, 0, 1);
	const before = new Date(1984, 0, 3);

	const actual = value.timestamp({ after, before });
	const actualTime = new Date(actual).getTime();

	t.true(before.getTime() > actualTime);
	t.true(after.getTime() < actualTime);
});
