import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as mock from "../src";

test(
	"creates a mock repository value",
	snapshotTwiceMacro,
	mock.api.repository,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	mock.api.repository({ seed: 1 }),
);

test("can be configured to include releases", (t) => {
	const actual = mock.api.repository({ withReleases: true });

	t.true(actual.refs.filter((ref) => !ref.isMasterRef).length > 0);
});

test("can be configured to include custom types", (t) => {
	const customTypeModels = [mock.model.customType(), mock.model.customType()];

	const actual = mock.api.repository({ customTypeModels });

	t.deepEqual(actual.types, {
		[customTypeModels[0].id]: customTypeModels[0].label,
		[customTypeModels[1].id]: customTypeModels[1].label,
	});
});
