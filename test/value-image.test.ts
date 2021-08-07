import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as value from "../src/value";
import * as model from "../src/model";

test("creates a mock Image field value", executeTwiceMacro, value.image, [
	{
		url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=5616&h=3744&fit=crop",
		dimensions: { width: 5616, height: 3744 },
		alt: "Inventore illum atque voluptatibus veniam excepturi.",
		copyright:
			"Consequuntur nostrum repellat minus repellat modi saepe porro voluptatem.",
	},
	{
		url: "https://images.unsplash.com/reserve/HgZuGu3gSD6db21T3lxm_San%20Zenone.jpg?w=6373&h=4253&fit=crop",
		dimensions: { width: 6373, height: 4253 },
		alt: "Distinctio ipsum placeat et.",
		copyright: "Mollitia aliquam soluta unde dolorum qui ad autem.",
	},
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => value.image({ seed: 1 }),
	[
		{
			url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2560&h=1705&fit=crop",
			dimensions: { width: 2560, height: 1705 },
			alt: "Repellat ratione ut sunt qui.",
			copyright: "Iure ut libero qui.",
			Mindshare: {
				url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1899&h=500&fit=crop",
				dimensions: { width: 1899, height: 500 },
				alt: "Ut nulla quam ipsam nobis cupiditate sed dignissimos debitis incidunt.",
				copyright: "Sed libero repudiandae.",
			},
		},
		{
			url: "https://images.unsplash.com/photo-1553531384-397c80973a0b?w=4335&h=6502&fit=crop",
			dimensions: { width: 4335, height: 6502 },
			alt: "Omnis et porro ut.",
			copyright:
				"Ipsam explicabo eligendi occaecati debitis et saepe eum dicta.",
			Interfaces: {
				url: "https://images.unsplash.com/photo-1553531384-397c80973a0b?w=1146&h=710&fit=crop",
				dimensions: { width: 1146, height: 710 },
				alt: "Eaque enim ipsum inventore debitis libero aspernatur deserunt quam.",
				copyright: "A velit provident velit eligendi nostrum ipsam qui.",
			},
		},
	],
);

test("supports custom model", (t) => {
	t.plan(4);

	const customModel = model.image({
		withConstraint: true,
		thumbnailsCount: 2,
	});

	const actual = value.image({
		model: customModel,
	});

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	t.is(actual.dimensions!.width, customModel.config.constraint.width);

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	t.is(actual.dimensions!.height, customModel.config.constraint.height);

	for (const thumbnailConfig of customModel.config.thumbnails) {
		t.true(thumbnailConfig.name in actual);
	}
});
