import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Select field value", executeTwiceMacro, value.select, [
	"Embrace",
	"Empower",
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => value.select({ seed: 1 }),
	["Recontextualize", "Evolve"],
);

test("supports custom model", (t) => {
	const customModel = model.select({ withDefaultValue: true });

	const actual = value.select({ model: customModel });

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	t.true(customModel.config.options.includes(actual!));
});
