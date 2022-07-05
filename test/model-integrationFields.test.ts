import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Integration Fields field model", snapshotTwiceMacro, (t) =>
	model.integrationFields({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	model.integrationFields({ seed: 1 }),
);

test("can be configured for a specific catalog", (t) => {
	const catalog = "foo";
	const actual = model.integrationFields({
		seed: t.title,
		catalog,
	});

	t.is(actual.config.catalog, catalog);
});
