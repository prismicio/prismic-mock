import test from "ava";
import { TableCell as TableCellInternal } from "@prismicio/types-internal/lib/customtypes";

import { snapshotTwiceMacro } from "./__testutils__/snapshotTwiceMacro";

import * as value from "../src/value";
import { TableCell } from "../src/value/table";

test("creates a mock Table field value", snapshotTwiceMacro, (t) =>
	value.table({ seed: t.title }),
);

test("supports number seed", snapshotTwiceMacro, () =>
	value.table({ seed: 1 }),
);

test("can be configured to return an empty value", snapshotTwiceMacro, (t) =>
	value.table({
		seed: t.title,
		state: "empty",
	}),
);

test("ensures the correct table cell model is used", (t) => {
	t.deepEqual(TableCell, TableCellInternal);
});
