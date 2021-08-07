import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";

test("creates a mock UID field value", executeTwiceMacro, value.uid, [
	"aut_sed",
	"ullam_voluptate",
]);

test("supports custom seed", executeTwiceMacro, () => value.uid({ seed: 1 }), [
	"esse_repellat",
	"quisquam_recusandae",
]);
