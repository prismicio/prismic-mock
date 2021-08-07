import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";

test("creates a mock KeyText field value", executeTwiceMacro, value.keyText, [
	"Aut sed ullam",
	"Voluptate inventore illum",
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => value.keyText({ seed: 1 }),
	["Esse repellat quisquam", "Recusandae alias consequuntur"],
);
