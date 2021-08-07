import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";

test("creates a mock Boolean field value", executeTwiceMacro, value.boolean, [
	false,
	false,
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => value.boolean({ seed: 1 }),
	[false, true],
);
