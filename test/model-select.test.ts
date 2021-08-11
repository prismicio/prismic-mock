import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Select field model", snapshotTwiceMacro, model.select);

test("supports custom seed", snapshotTwiceMacro, () =>
	model.select({ seed: 1 }),
);

test(
	"can be configured for a specific number of options",
	snapshotTwiceMacro,
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
	snapshotTwiceMacro,
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
