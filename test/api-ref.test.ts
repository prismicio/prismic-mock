import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as mock from "../src";

test("creates a mock ref value", snapshotTwiceMacro, () => mock.api.ref());

test("supports custom seed", snapshotTwiceMacro, (t) =>
	mock.api.ref({ seed: t.title }),
);

test("can be configured to return a master ref", (t) => {
	const actual = mock.api.ref({
		seed: t.title,
		isMasterRef: true,
	});

	t.is(actual.isMasterRef, true);
	t.is(actual.label, "Master");
});

test("can be configured to return a scheduled ref", (t) => {
	const actual = mock.api.ref({
		seed: t.title,
		isScheduled: true,
	});

	t.is(typeof actual.scheduledAt, "string");
});
