import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Integration Fields field value", snapshotTwiceMacro, (t) =>
	value.integration({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	value.integration({ seed: 1 }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.integration({
		seed: t.title,
		state: "empty",
	});

	t.is(actual, null);
});

test("can be configured to return provided data", (t) => {
	const data = { foo: "bar" };
	const actual = value.integration({
		seed: t.title,
		data,
	});

	t.is(actual, data);
});
