import { TableCell as TableCellInternal } from "@prismicio/types-internal/lib/customtypes"
import { it, expect } from "vitest"

import * as value from "../src/value"
import { TableCell } from "../src/value/table"
import { snapshotTwice } from "./__testutils__/snapshotTwiceMacro"

it("creates a mock Table field value", ({ task }) => {
	snapshotTwice((name) => value.table({ seed: name }), task.name)
})

it("supports number seed", ({ task }) => {
	snapshotTwice(() => value.table({ seed: 1 }), task.name)
})

it("can be configured to return an empty value", ({ task }) => {
	snapshotTwice(
		(name) =>
			value.table({
				seed: name,
				state: "empty",
			}),
		task.name,
	)
})

it("ensures the correct table cell model is used", () => {
	expect(TableCell).toEqual(TableCellInternal)
})
