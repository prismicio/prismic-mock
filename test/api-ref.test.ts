import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as mock from "../src";

test("creates a mock ref value", snapshotTwiceMacro, (t) =>
	mock.api.ref({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	mock.api.ref({ seed: 1 }),
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
