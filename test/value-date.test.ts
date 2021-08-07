import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";

test("creates a mock Date field value", executeTwiceMacro, value.date, [
	"2021-08-17",
	"2021-07-26",
]);

test("supports custom seed", executeTwiceMacro, () => value.date({ seed: 1 }), [
	"2022-03-14",
	"2020-10-13",
]);

test("can be configured to return a date after and before given dates", (t) => {
	const actual = value.date({
		after: new Date(1984, 0, 1),
		before: new Date(1984, 0, 3),
	});

	t.is(actual, "1984-01-02");
});
