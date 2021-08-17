import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Key Text field value", snapshotTwiceMacro, value.keyText);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.keyText({ seed: 1 }),
);
