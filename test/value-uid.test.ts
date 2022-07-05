import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock UID field value", snapshotTwiceMacro, (t) =>
	value.uid({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () => value.uid({ seed: 1 }));
