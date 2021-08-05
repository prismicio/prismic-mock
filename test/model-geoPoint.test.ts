import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test("creates a mock GeoPoint field model", executeTwiceMacro, model.geoPoint, [
	{
		config: {
			label: "Synergies",
		},
		type: "GeoPoint",
	},
	{
		config: {
			label: "Infrastructures",
		},
		type: "GeoPoint",
	},
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.geoPoint({ seed: 1 }),
	[
		{
			config: {
				label: "Technologies",
			},
			type: "GeoPoint",
		},
		{
			config: {
				label: "Blockchains",
			},
			type: "GeoPoint",
		},
	],
);
