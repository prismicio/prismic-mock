import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock UID field value", snapshotTwiceMacro, value.uid);

test("supports custom seed", snapshotTwiceMacro, () => value.uid({ seed: 1 }));
