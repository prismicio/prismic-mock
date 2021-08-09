import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";

test(
	"creates a mock Timestamp field value",
	executeTwiceMacro,
	value.timestamp,
	["2021-10-09T12:31:48.785Z", "2020-08-09T00:52:01.724Z"],
);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => value.timestamp({ seed: 1 }),
	["2033-03-15T15:07:14.368Z", "2004-12-05T06:30:35.173Z"],
);

test("can be configured to return a timestamp after and before given timestamps", (t) => {
	const actual = value.timestamp({
		after: new Date(1984, 0, 1),
		before: new Date(1984, 0, 3),
	});

	t.is(actual, "1984-01-02T09:10:08.299Z");
});
