import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as prismicM from "../src";

test("creates mock field models for group field", snapshotTwiceMacro, (t) =>
	prismicM.model.buildMockGroupFieldMap({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	prismicM.model.buildMockGroupFieldMap({ seed: 1 }),
);
