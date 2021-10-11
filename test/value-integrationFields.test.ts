import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";

test(
	"creates a mock Integration Fields field value",
	snapshotTwiceMacro,
	value.integrationFields,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.integrationFields({ seed: 1 }),
);

test("can be configured to return an empty value", (t) => {
	const actual = value.integrationFields({ state: true });

	t.is(actual, null);
});

test("can be configured to return provided data", (t) => {
	const data = { foo: "bar" };
	const actual = value.integrationFields({ data });

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	t.is(actual!.blob, data);
});
