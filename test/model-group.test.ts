import test from "ava";

import { executeTwiceMacro } from "./__testutils__/executeTwiceMacro";

import * as model from "../src/model";

test("creates a mock Group field model", executeTwiceMacro, model.group, [
	{
		type: "Group",
		config: {
			label: "Architectures",
			fields: {
				voluptatibus_veniam: {
					type: "GeoPoint",
					config: {
						label: "Convergence",
					},
				},
				nostrum: {
					type: "Image",
					config: {
						label: "Deliverables",
						constraint: { width: null, height: null },
						thumbnails: [
							{
								name: "Blockchains",
								width: 832,
								height: 1842,
							},
							{
								name: "Mindshare",
								width: 892,
								height: 577,
							},
							{
								name: "Mindshare",
								width: 1243,
								height: 719,
							},
						],
					},
				},
			},
		},
	},
	{
		type: "Group",
		config: {
			label: "Models",
			fields: {
				tempora_quasi_ab: {
					type: "Date",
					config: {
						label: "Users",
						placeholder: "Fugit omnis asperiores",
					},
				},
				in: {
					type: "GeoPoint",
					config: {
						label: "Niches",
					},
				},
			},
		},
	},
]);

test(
	"supports custom seed",
	executeTwiceMacro,
	() => model.group({ seed: 1 }),
	[
		{
			type: "Group",
			config: {
				label: "E Business",
				fields: {
					recusandae_alias_consequuntur: {
						type: "Color",
						config: {
							label: "E Tailers",
							placeholder: "Repellat ratione ut",
						},
					},
					nulla_quam: {
						type: "Link",
						config: {
							label: "E Services",
							placeholder: "Nobis cupiditate sed",
							select: "media",
						},
					},
					accusantium: {
						type: "StructuredText",
						config: {
							label: "Networks",
							placeholder: "Porro ut et",
							allowTargetBlank: undefined,
							multi:
								"strong,preformatted,heading2,heading5,paragraph,embed,heading6,image,list-item",
						},
					},
				},
			},
		},
		{
			type: "Group",
			config: {
				label: "Synergies",
				fields: {
					eum_dicta_eum: {
						type: "Boolean",
						config: {
							label: "Web Readiness",
						},
					},
					aspernatur_deserunt_quam: {
						type: "Embed",
						config: {
							label: "Infomediaries",
							placeholder: "A velit provident",
						},
					},
					velit_sit_aperiam: {
						type: "StructuredText",
						config: {
							label: "Functionalities",
							placeholder: "Explicabo exercitationem ut",
							allowTargetBlank: undefined,
							single:
								"preformatted,heading6,heading1,heading2,paragraph,list-item,heading3,heading4,image,strong,embed,em",
						},
					},
				},
			},
		},
	],
);

test("can be configured for specific number of field types", (t) => {
	const actual = model.group({
		configs: {
			boolean: { count: 1 },
			color: { count: 0 },
			contentRelationship: { count: 0 },
			date: { count: 0 },
			embed: { count: 0 },
			geoPoint: { count: 0 },
			image: { count: 0 },
			keyText: { count: 0 },
			link: { count: 0 },
			linkToMedia: { count: 0 },
			number: { count: 0 },
			richText: { count: 0 },
			select: { count: 0 },
			timestamp: { count: 0 },
			title: { count: 0 },
		},
	});

	const fieldIds = Object.keys(actual.config.fields);

	t.is(fieldIds.length, 1);
	t.is(actual.config.fields[fieldIds[0]].type, "Boolean");
});

test("can be configured for specific field type configurations", (t) => {
	const actual = model.group({
		configs: {
			boolean: { count: 0 },
			color: { count: 0 },
			contentRelationship: { count: 0 },
			date: { count: 0 },
			embed: { count: 0 },
			geoPoint: { count: 0 },
			image: {
				count: 1,
				config: {
					withConstraint: true,
					thumbnailsCount: 0,
				},
			},
			keyText: { count: 0 },
			link: { count: 0 },
			linkToMedia: { count: 0 },
			number: { count: 0 },
			richText: { count: 0 },
			select: { count: 0 },
			timestamp: { count: 0 },
			title: { count: 0 },
		},
	});

	const fieldIds = Object.keys(actual.config.fields);

	t.is(fieldIds.length, 1);
	t.is(actual.config.fields[fieldIds[0]].type, "Image");

	t.deepEqual(actual.config.fields[fieldIds[0]].config, {
		constraint: {
			height: 629,
			width: 665,
		},
		label: "Synergies",
		thumbnails: [],
	});
});
