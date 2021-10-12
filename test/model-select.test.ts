import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Select field model", snapshotTwiceMacro, () =>
	model.select(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	model.select({ seed: t.title }),
);

test(
	"can be configured for a specific number of options",
	snapshotTwiceMacro,
	(t) =>
		model.select({
			seed: t.title,
			optionsCount: 2,
		}),
);

test("can be configured to include a default value", snapshotTwiceMacro, (t) =>
	model.select({
		seed: t.title,
		withDefaultValue: true,
	}),
);
