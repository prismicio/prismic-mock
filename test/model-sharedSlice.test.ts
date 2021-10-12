import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as prismicM from "../src";

test("creates a mock Shared Slice model", snapshotTwiceMacro, () =>
	prismicM.model.sharedSlice(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	prismicM.model.sharedSlice({ seed: t.title }),
);

test("can be configured with a specific id", (t) => {
	const actual = prismicM.model.sharedSlice({
		seed: t.title,
		id: "custom_id",
	});

	t.is(actual.id, "custom_id");
	t.is(actual.name, "CustomId");
});

test("can be configured with a specific name", (t) => {
	const actual = prismicM.model.sharedSlice({
		seed: t.title,
		name: "Custom Name",
	});

	t.is(actual.id, "custom_name");
	t.is(actual.name, "Custom Name");
});

test("can be configured with a specific id and name", (t) => {
	const actual = prismicM.model.sharedSlice({
		seed: t.title,
		id: "custom_id",
		name: "Custom Name",
	});

	t.is(actual.id, "custom_id");
	t.is(actual.name, "Custom Name");
});

test("can be configured with specific variations", (t) => {
	const variations = [
		prismicM.model.sharedSliceVariation({ seed: t.title }),
		prismicM.model.sharedSliceVariation({ seed: t.title }),
	];

	const actual = prismicM.model.sharedSlice({
		seed: t.title,
		variations,
	});

	t.is(actual.variations, variations);
});
