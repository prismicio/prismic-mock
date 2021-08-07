import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";

test(
	"creates a mock Number field value",
	executeTwiceMacro,
	value.number,
	[875, 11994],
);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => value.number({ seed: 1 }),
	[41702, 99718],
);
