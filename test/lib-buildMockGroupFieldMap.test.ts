import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as prismicM from "../src";

test("creates mock field models for group field", snapshotTwiceMacro, () =>
	prismicM.model.buildMockGroupFieldMap(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	prismicM.model.buildMockGroupFieldMap({ seed: t.title }),
);
