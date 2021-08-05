import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Shared Slice choice field model",
	executeTwiceMacro,
	model.sharedSliceChoice,
	[
		{
			type: "SharedSlice",
		},
		{
			type: "SharedSlice",
		},
	],
);
