import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";

test(
	"creates a mock Timestamp field value",
	executeTwiceMacro,
	value.timestamp,
	["2021-08-17T00:59:06.020Z", "2021-07-26T21:31:33.781Z"],
);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => value.timestamp({ seed: 1 }),
	["2022-03-14T09:47:10.547Z", "2020-10-13T16:34:13.730Z"],
);

test("can be configured to return a timestamp after and before given timestamps", (t) => {
	const actual = value.timestamp({
		after: new Date(1984, 0, 1),
		before: new Date(1984, 0, 3),
	});

	t.is(actual, "1984-01-02T09:10:08.299Z");
});
