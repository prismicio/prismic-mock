import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";

test("creates a mock GeoPoint field value", executeTwiceMacro, value.geoPoint, [
	{ longitude: -88.424, latitude: -136.8212 },
	{ longitude: -36.2258, latitude: -32.9039 },
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => value.geoPoint({ seed: 1 }),
	[
		{ longitude: -14.936, latitude: 178.9866 },
		{ longitude: 39.6584, latitude: 155.7207 },
	],
);
