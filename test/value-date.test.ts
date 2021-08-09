import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";

test("creates a mock Date field value", executeTwiceMacro, value.date, [
	"2021-10-09",
	"2020-08-09",
]);

test("supports custom seed", executeTwiceMacro, () => value.date({ seed: 1 }), [
	"2033-03-15",
	"2004-12-05",
]);

test("can be configured to return a date after and before given dates", (t) => {
	const actual = value.date({
		after: new Date(1984, 0, 1),
		before: new Date(1984, 0, 3),
	});

	t.is(actual, "1984-01-02");
});
