import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Embed field value", snapshotTwiceMacro, value.embed);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.embed({ seed: 1 }),
);
