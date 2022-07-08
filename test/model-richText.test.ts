import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Rich Text field model", snapshotTwiceMacro, (t) =>
	model.richText({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	model.richText({ seed: 1 }),
);

test(
	"can be configured to always allow multiple blocks",
	snapshotTwiceMacro,
	(t) =>
		model.richText({
			seed: t.title,
			withMultipleBlocks: true,
		}),
);
