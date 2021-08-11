import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test(
	"creates a mock Link To Media field value",
	snapshotTwiceMacro,
	value.linkToMedia,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.linkToMedia({ seed: 1 }),
);

test("can be configured to return an unfilled value", (t) => {
	const actual = value.linkToMedia({ isFilled: false });

	t.false("url" in actual);
});
