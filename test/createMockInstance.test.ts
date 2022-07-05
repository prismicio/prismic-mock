import test from "ava";

import { createMockFactory, MockFactory } from "../src";

test("creates a mock instance", (t) => {
	const mock = createMockFactory({ seed: t.title });

	t.true(mock instanceof MockFactory);
});

test("supports number seed", (t) => {
	const mock = createMockFactory({ seed: 1 });

	t.true(mock instanceof MockFactory);
});
