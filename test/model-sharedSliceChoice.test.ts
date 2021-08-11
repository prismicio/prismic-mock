import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test(
	"creates a mock Shared Slice choice field model",
	snapshotTwiceMacro,
	model.sharedSliceChoice,
);
