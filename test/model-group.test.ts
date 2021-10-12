import test from "ava";
import * as prismicT from "@prismicio/types";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as model from "../src/model";

test("creates a mock Group field model", snapshotTwiceMacro, () =>
	model.group(),
);

test("supports custom seed", snapshotTwiceMacro, (t) =>
	model.group({ seed: t.title }),
);

test("can be configured for specific fields", (t) => {
	const actual = model.group({
		seed: t.title,
		fields: {
			boolean: model.boolean({ seed: t.title }),
		},
	});

	t.is(
		actual.config.fields.boolean.type,
		prismicT.CustomTypeModelFieldType.Boolean,
	);
});
