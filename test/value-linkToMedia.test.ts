import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Link To Media field value", snapshotTwiceMacro, () =>
	value.linkToMedia(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	value.linkToMedia({ seed: t.title }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.linkToMedia({
		seed: t.title,
		state: "empty",
	});

	t.false("url" in actual);
});
