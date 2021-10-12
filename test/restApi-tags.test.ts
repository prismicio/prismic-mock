import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as mock from "../src";

test("creates a mock tags value", snapshotTwiceMacro, () => mock.api.tags());

test("supports custom seed", snapshotTwiceMacro, (t) =>
	mock.api.tags({ seed: t.title }),
);
