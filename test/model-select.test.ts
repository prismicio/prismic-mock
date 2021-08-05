import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test("creates a mock Select field model", executeTwiceMacro, model.select, [
	{
		config: {
			label: "E Tailers",
			placeholder: "Voluptate inventore illum",
			options: ["Embrace"],
			default_value: undefined,
		},
		type: "Select",
	},
	{
		config: {
			label: "Schemas",
			placeholder: "Consequuntur nostrum repellat",
			options: ["Redefine", "Morph", "Syndicate"],
			default_value: undefined,
		},
		type: "Select",
	},
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.select({ seed: 1 }),
	[
		{
			config: {
				label: "Synergies",
				placeholder: "Consequuntur corporis repellat",
				options: ["Recontextualize", "Innovate", "Cultivate"],
				default_value: undefined,
			},
			type: "Select",
		},
		{
			config: {
				label: "Partnerships",
				placeholder: "Qui amet iure",
				options: ["Enhance"],
				default_value: undefined,
			},
			type: "Select",
		},
	],
);

test(
	"can be configured for a specific number of options",
	executeTwiceMacro,
	() => model.select({ optionsCount: 2 }),
	[
		{
			config: {
				label: "Eyeballs",
				placeholder: "Saepe porro voluptatem",
				options: ["Scale", "Recontextualize"],
				default_value: undefined,
			},
			type: "Select",
		},
		{
			config: {
				label: "Convergence",
				placeholder: "Ratione distinctio ipsum",
				options: ["Streamline", "Innovate"],
				default_value: undefined,
			},
			type: "Select",
		},
	],
);

test(
	"can be configured to include a default value",
	executeTwiceMacro,
	() => model.select({ withDefaultValue: true }),
	[
		{
			config: {
				label: "Infomediaries",
				placeholder: "Unde dolorum qui",
				options: ["Maximize", "Repurpose", "Engage", "Incentivize"],
				default_value: "Repurpose",
			},
			type: "Select",
		},
		{
			config: {
				label: "Users",
				placeholder: "Fugit omnis asperiores",
				options: ["Matrix", "Architect", "Optimize", "Integrate"],
				default_value: "Matrix",
			},
			type: "Select",
		},
	],
);
