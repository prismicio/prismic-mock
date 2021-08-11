import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Boolean field value", snapshotTwiceMacro, value.boolean);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.boolean({ seed: 1 }),
);
