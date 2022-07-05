import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Key Text field value", snapshotTwiceMacro, (t) =>
	value.keyText({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	value.keyText({ seed: 1 }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.keyText({
		seed: t.title,
		state: "empty",
	});

	t.is(actual, null);
});
