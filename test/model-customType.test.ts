import test from "ava";

import { customType } from "../src/model/customType";

test("creates a random Custom Type model", (t) => {
	const model = customType();

	t.log(model.json);

	t.pass();
});
