import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as mock from "../src";

test("creates a mock repository value", snapshotTwiceMacro, (t) =>
	mock.api.repository({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	mock.api.repository({ seed: 1 }),
);

test("can be configured to include releases", (t) => {
	const actual = mock.api.repository({
		seed: t.title,
		withReleases: true,
	});

	t.true(actual.refs.filter((ref) => !ref.isMasterRef).length > 0);
});

test("can be configured to include custom types", (t) => {
	const seed = t.title;

	const customTypeModels = [
		mock.model.customType({ seed }),
		mock.model.customType({ seed }),
	];

	const actual = mock.api.repository({ seed, customTypeModels });

	t.deepEqual(actual.types, {
		[customTypeModels[0].id]: customTypeModels[0].label,
		[customTypeModels[1].id]: customTypeModels[1].label,
	});
});
