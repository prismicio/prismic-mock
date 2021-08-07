import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";

test("creates a mock Color field value", executeTwiceMacro, value.color, [
	"#010F26",
	"#340768",
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => value.color({ seed: 1 }),
	["#35805C", "#770010"],
);
