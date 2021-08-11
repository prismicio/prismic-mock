import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test("creates a mock Link field model", executeTwiceMacro, model.link, [
	{
		config: {
			label: "Synergies",
			placeholder: "Sed ullam voluptate",
			select: null,
			allowTargetBlank: undefined,
		},
		type: "Link",
	},
	{
		config: {
			label: "Networks",
			placeholder: "Atque voluptatibus veniam",
			select: null,
			allowTargetBlank: true,
		},
		type: "Link",
	},
]);

test("supports custom seed", executeTwiceMacro, () => model.link({ seed: 1 }), [
	{
		config: {
			label: "Technologies",
			placeholder: "Repellat quisquam recusandae",
			select: null,
			allowTargetBlank: undefined,
		},
		type: "Link",
	},
	{
		config: {
			label: "Infrastructures",
			placeholder: "Corporis repellat ratione",
			select: null,
			allowTargetBlank: undefined,
		},
		type: "Link",
	},
]);

test("can be configured to explicitly support blank target", (t) => {
	const actualTrue = model.link({ allowTargetBlank: true });
	t.is(actualTrue.config.allowTargetBlank, true);

	const actualFalse = model.link({ allowTargetBlank: false });
	t.is(actualFalse.config.allowTargetBlank, undefined);
});
