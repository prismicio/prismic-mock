import test from "ava";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test(
	"creates a mock CustomType field value",
	snapshotTwiceMacro,
	value.customType,
);

test("supports custom seed", snapshotTwiceMacro, () =>
	value.customType({ seed: 1 }),
);

test("supports custom model", (t) => {
	const customModel = model.customType({
		withUID: true,
		tabsCount: 1,
		withSliceZones: true,
		withSharedSlices: true,
	});

	const actual = value.customType({ model: customModel });

	t.is(typeof actual.uid, "string");
});
