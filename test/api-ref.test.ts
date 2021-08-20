import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as mock from "../src";

test("creates a mock ref value", snapshotTwiceMacro, mock.api.ref);

test("supports custom seed", snapshotTwiceMacro, () =>
	mock.api.ref({ seed: 1 }),
);

test("can be configured to return a master ref", (t) => {
	const actual = mock.api.ref({ isMasterRef: true });

	t.is(actual.isMasterRef, true);
	t.is(actual.label, "Master");
});

test("can be configured to return a scheduled ref", (t) => {
	const actual = mock.api.ref({ isScheduled: true });

	t.is(typeof actual.scheduledAt, "string");
});
