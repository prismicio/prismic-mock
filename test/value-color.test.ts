import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Color field value", snapshotTwiceMacro, value.color);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.color({ seed: 1 }),
);
