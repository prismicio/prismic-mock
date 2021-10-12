import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test("creates a mock Integration Fields field value", snapshotTwiceMacro, () =>
	value.integrationFields(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	value.integrationFields({ seed: t.title }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.integrationFields({
		seed: t.title,
		state: "empty",
	});

	t.is(actual, null);
});

test("can be configured to return provided data", (t) => {
	const data = { foo: "bar" };
	const actual = value.integrationFields({
		seed: t.title,
		data,
	});

	t.is(actual.blob, data);
});
