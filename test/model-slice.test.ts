import test from "ava";
import * as prismicT from "@prismicio/types";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as prismicM from "../src";

test("creates a mock Slice field model", snapshotTwiceMacro, () =>
	prismicM.model.slice(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	prismicM.model.slice({ seed: t.title }),
);

test("can be configured for specific non-repeat and repeat fields", (t) => {
	const actual = prismicM.model.slice({
		seed: t.title,
		nonRepeatFields: {
			boolean: prismicM.model.boolean({ seed: t.title }),
		},
		repeatFields: {
			keyText: prismicM.model.keyText({ seed: t.title }),
		},
	});

	t.is(
		actual["non-repeat"].boolean.type,
		prismicT.CustomTypeModelFieldType.Boolean,
	);
	t.is(actual.repeat.keyText.type, prismicT.CustomTypeModelFieldType.Text);
});
